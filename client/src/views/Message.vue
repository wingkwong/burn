<template>
  <div class="message">
    <div v-if="!submitted">
	   You are about to open message {{$route.params.id}}
	 </div>

	  <div v-if="submitted">
	  	{{this.content}}
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
   apollo: {
    getMessage: {
      query: GetMessage,
      variables() {
        return {id: this.$route.params.id}
      },
      pollInterval: 90000,
      result ({data: { getMessage }}) {
       this.submitted = true
       this.content = getMessage.message
       console.log(getMessage)
      },
    }
  }
}


</script>
