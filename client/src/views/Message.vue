<template>
  <div v-if="!isLoading" class="message">
     <div v-if="!isOpen && !isDeleted">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>You are about to open message {{$route.params.id}}</span>
          </div>
          <el-button type="primary" @click="openMessage">Open</el-button>
          <el-button type="danger" @click="deleteMessage">Delete</el-button>
        </el-card>
     </div>
     <div v-if="isOpen && !isDeleted">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>This message has been deleted. <br>Make sure to copy the message before closing the window.</span>
        </div>
        <pre v-html="this.content" v-linkified></pre>
      </el-card>
     </div>
      <div v-if="isDeleted">
        <el-card class="box-card">
        <span>This message is not available. Either it has been deleted or it does not exist.</span>
      </el-card>
      </div>
  </div>
</template>

<script>
import { GetMessage, DeleteMessage } from '../query.gql'

export default {
 name: 'message',
 data() {
    return {
	    isOpen: false,
      isLoading: true,
	    error: false,
      isDeleted: false,
      deleteAfterRead: false,
	    content: ''
    }
  },
 apollo: {
  getMessage: {
    query: GetMessage,
    variables() {
      return {id: this.$route.params.id}
    },
    pollInterval: 90000,
    result ({data: { getMessage }}) {
     if(getMessage == null) {
      this.isDeleted = true
     } else {
      this.content = getMessage.message
     }

     this.isLoading = false
    }
  }
  },
  methods: {
    openMessage: function() {
     this.isOpen = true
     this.deleteAfterRead = true
     this.deleteMessage()
    },
    deleteMessage: function() {
      this.$apollo.mutate({
        mutation: DeleteMessage,
         variables:{
          id: this.$route.params.id
        }
      }).then(({data}) => {
        this.error = false
        if(!this.deleteAfterRead) {
          this.isDeleted = true
        }
      }).catch((error) => {
        if (error.graphQLErrors.length >= 1) {
          this.error = error.graphQLErrors[0].message            
        } else {
          this.error = 'Something went wrong'
        }
        console.log(error)
      })
    },
  }
}


</script>
