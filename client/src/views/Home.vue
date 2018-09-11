<template>
  <el-container>
    <el-main>
      <div class="container-center">
        <h2>Burn</h2>
        <div>Share self-destructing message to others</div>

        <div v-if="error" class="error">
         <el-alert
		   	v-bind:title="error"
		    type="error">
		  </el-alert>
        </div>

        <el-form ref="form" :model="form" @submit.native.prevent="capture">
          <el-form-item>
            <el-input type="textarea" v-model="form.message" placeholder="Message" autosize></el-input>
          </el-form-item>
          <el-form-item>
            <el-button round @click="capture">Submit</el-button>
          </el-form-item>
        </el-form>

        <div v-if="submitted">
          <div>Thank you!</div>
          <div>Please check your email.</div>
        </div> 
      </div>

    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { getMessage } from '../query.gql'

export default {
  name: 'home',
  
  data() {
    return {
      submitted: false,
      error: false,
      form: {
        message: '',
      }
    }
  },

  methods: {
    async capture() {
      const { message } = this.form
      if (!message) {
        this.error = 'Please enter message'
        return
      }

      this.$apollo.mutate({
        mutation: getMessage,
        variables: {message}
      }).then(({data}) => {
        this.submitted = true
        this.error = false
      }).catch((error) => {
        if (error.graphQLErrors.length >= 1) {
          this.error = error.graphQLErrors[0].message            
        } else {
          this.error = 'Something went wrong'
        }
        console.log(error)
      })

    }
   }
}
</script>
