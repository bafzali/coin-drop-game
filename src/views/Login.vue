<template>
  <div>
    <!-- Login Form -->
    <b-form @submit.prevent v-if="showLoginForm && !performingRequest">
      <h3>Login</h3>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model.trim="loginForm.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model.trim="loginForm.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button @click="login" variant="primary">Submit</b-button>
      <b-button @click="togglePasswordReset" variant="danger">Forgot Password</b-button>
      <b-button @click="toggleLoginForm" variant="info">Create an Account</b-button>
      
    </b-form>

    <!-- signup form -->
    <b-form @submit.prevent v-if="!showLoginForm && !showForgotPassword">
      <h3>Sign Up</h3>
      <b-form-group
        id="signup-userName"
        label="Username:"
        label-for="signup-userName-input"
      >
        <b-form-input
          id="signup-userName-input"
          v-model.trim="signupForm.userName"
          type="text"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="signup-email"
        label="Email address:"
        label-for="signup-email-input"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="signup-email-input"
          v-model.trim="signupForm.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="signup-password" label="Password:" label-for="signup-password-input">
        <b-form-input
          id="signup-password-input"
          v-model.trim="signupForm.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button @click="signUp" variant="primary">Create an Account</b-button>

      <b-button @click="toggleLoginForm" variant="info">Back to Login</b-button>
    </b-form>

    <!-- forgot password form -->
    <b-form @submit.prevent v-if="showForgotPassword">
      <div v-if="!passwordResetSuccess">
        <h3>Reset Password</h3>
        <p>We will send an email to reset your password.</p>
        <b-form-group
          id="reset-password-email"
          label="Email address:"
          label-for="reset-password-email-input"
        >
          <b-form-input
            id="reset-password-email-input"
            v-model.trim="passwordResetForm.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-button @click="resetPassword" variant="primary">Reset Password</b-button>
      </div>
      <div v-else>
        <h3>Email Sent</h3>
        <p>Check your email for a link to reset your password.</p>
      </div>
      <b-button @click="toggleLoginForm" variant="primary">Back to Login</b-button>
    </b-form>
    <transition name="fade">
      <div v-if="performingRequest" class="text-center">
        <b-spinner variant="secondary" label="Spinning"></b-spinner>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errorMessage !== ''">
        <h3>{{ errorMessage }}</h3>
      </div>
    </transition>
  </div>
</template>

<script>
const fbase = require("../firebaseConfig")

export default {
  data () {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        userName: "",
        email: "",
        password: ""
      },
      passwordResetForm: {
        email: ""
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMessage: ""
    }
  },
  methods: {
    toggleLoginForm() {
      this.errorMessage = ""
      this.showLoginForm = !this.showLoginForm
      if(this.showForgotPassword === true) {
        this.showForgotPassword = false
      }
    },
    togglePasswordReset() {
      if(this.showForgotPassword) {
        this.showLoginForm = true
        this.showForgotPassword = false
      } else {
        this.showLoginForm = false
        this.showForgotPassword = true
      }
    },
    login() {
      this.performingRequest = true
      fbase.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
      .then(user => {
        console.log(user.user.uid);
        this.$store.commit("setCurrentUser", user.user)
        this.$store.dispatch("fetchUserProfile")
        this.performingRequest = false
        this.$router.push("/dashboard")
      }).catch(err => {
        console.log(err);
        this.performingRequest = false
        this.errorMessage = err.message
      })
    },
    signUp() {
      this.performingRequest = true
      fbase.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
      .then(user => {
        fbase.userCollection.doc(user.user.uid).set({
          userName: this.signupForm.userName,
          wins: 0,
          totalGamesPlayed: 0,
          currentGameID: "",
          friends: []
        }).then(() => {
          this.$store.dispatch("fetchUserProfile")
          this.performingRequest = false
          this.$router.push("/dashboard")
        })
      })
      .catch(err => {
        console.log(err);
        this.performingRequest = false
        this.errorMessage = err.message
      })
    },
    resetPassword() {
      this.performingRequest = true
      fbase.auth.sendPasswordResetEmail(this.passwordResetForm.email)
      .then(() => {
        this.performingRequest = false
        this.passwordResetSuccess = true
        this.passwordResetForm.email = ""
      }).catch(err => {
        console.log(err);
        this.performingRequest = false
        this.errorMessage = err.message
      })
    }
  }
}
</script>