<template>
  <el-container>
    <el-main>
      <div class="container-center">
        <h2>Burn</h2>
        <div class="desc">Share self-destructing messages to others</div>

        <div v-if="!submitted">
	        <div v-if="error" class="error">
	         <el-alert
			   	v-bind:title="error"
			    type="error">
			  </el-alert>
	        </div>

	        <el-form ref="form" :model="form" @submit.native.prevent="capture">
	          <el-form-item>
	            <el-input type="textarea" :autosize="{ minRows: 5}" v-model="form.message" placeholder="Message"></el-input>
	          </el-form-item>
	          <el-form-item>
	            <el-button round @click="capture">Submit</el-button>
	          </el-form-item>
	        </el-form>
		</div>
        <div v-if="submitted">
          <div>
          	<h2>Your link is ready.</h2>
          	<el-input
      			  placeholder="Please input"
      			  v-model="form.link"
      			  :disabled="true">
              <el-button 
                slot="append" 
                v-clipboard:copy=form.link
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                >Copy</el-button>
      			</el-input>
          </div>
        </div> 

      </div>

    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { CreateMessage } from '../query.gql'

export default {
  name: 'home',

  data() {
    return {
      submitted: false,
      error: false,
      form: {
        message: '',
        link: ''
      },
      
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
        mutation: CreateMessage,
        variables: {message}
      }).then(({data}) => {
        this.submitted = true
        this.error = false
        this.form.link = data.createMessage._id
      }).catch((error) => {
        if (error.graphQLErrors.length >= 1) {
          this.error = error.graphQLErrors[0].message            
        } else {
          this.error = 'Something went wrong'
        }
        console.log(error)
      })

    },
    onCopy: function (e) {
      alert('Text copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
   }
}
</script>
