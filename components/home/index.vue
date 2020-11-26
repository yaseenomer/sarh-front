<template>
  <div>
    <posts />
    <companies />
  </div>
</template>

<script>
import posts from '~/components/home/posts'
import companies from '~/components/home/companies'
export default {
  components: { posts, companies },
}
</script>
