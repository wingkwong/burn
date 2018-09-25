<template>
  <div class="message">

	   
     <div v-if="!submitted">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>You are about to open message {{$route.params.id}}</span>
          </div>
          <el-button type="primary" @click="openMessage">Open</el-button>
          <el-button type="danger" @click="deleteMessage">Delete</el-button>
        </el-card>
     </div>
     <div v-if="submitted">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>This message will be deleted after closing the window.</span>
        </div>
      {{this.content}}
      </el-card>
      </div>
  </div>
</template>

<script>
import { GetMessage } from '../query.gql'

export default {
 name: 'message',
 data() {
    return {
	    submitted: false,
	    error: false,
	    content: ''
    }
  },
  methods: {
    openMessage: function() {
      this.$apollo.query({
        query: GetMessage,
        variables:{
          id: this.$route.params.id
        }
      }).then(({data: { getMessage }}) => {
       this.submitted = true
       this.content = getMessage.message
       this.error = false
      }).catch((error) => {
        if (error.graphQLErrors.length >= 1) {
          this.error = error.graphQLErrors[0].message            
        } else {
          this.error = 'Something went wrong'
        }
        console.log(error)
      })
    },
    deleteMessage: function() {
      alert('delete')
    },
  }
}


</script>
