<template>
  <v-container class="mt-12 pt-12">
    <h1 class="display-1 pb-3">Policies</h1>
    <p>
      Our staff, board, and advisory board are bound by the following policies:
    </p>
    <ul style="margin: 20px 0px 30px 30px;">
      <li><a href="/conflict-of-interest-policy.pdf">Conflict of Interest Policy</a> - declared conflicts of interest are published <a href="https://docs.google.com/spreadsheets/d/19HJtpWlintDX9J3etqi4AtvJvCwdVN4JnfyVcKICNKI/edit?usp=sharing" target="_blank">here</a>.</li>
      <li><a href="/anti-fraud-and-bribery-policy.pdf">Anti-Fraud and Bribery Policy</a></li>
      <li><a href="/accessibility">Accessibility Statement5</a></li>
    </ul>

  </v-container>
</template>

<script>
export default {
  name: "Policies",
  metaInfo() {
    return {
      title: "Policies"
    }
  },
}
</script>

<style scoped>
li {
  margin-bottom: 10px;
}
</style>