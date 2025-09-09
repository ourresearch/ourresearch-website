<template>
  <v-container class="mt-12 pt-12">
    <div v-if="!jobKey">
      <div class="text-h3">Careers</div>

      <div class="mt-8">
        <v-row>
          <v-col cols="12">

              <v-card class="px-3 py-5 mb-10 job-link-card" to="careers/metadata-curation-specialist">
                <div class="text-h5 mb-4">Metadata Curation Specialist — OpenAlex</div>
                <div class="text-subtitle1">💵 $70k | 🌍 Fully Remote | ⏱ Full-time (40–50 hrs/wk)</div>
              </v-card>

              <v-card class="px-3 py-5 mb-10 job-link-card" to="careers/funding-community-manager">
                <div class="text-h5 mb-4">Funding Community Manager — OpenAlex</div>
                <div class="text-subtitle1">💵 $90k | 🌍 Fully Remote | ⏱ Full-time (40–50 hrs/wk)</div>
              </v-card>

              <v-card class="px-3 py-5 mb-10 job-link-card" to="careers/senior-engineer-funding-metadata">
                <div class="text-h5 mb-4">Senior Engineer, Funding Metadata — OpenAlex</div>
                <div class="text-subtitle1">💵 $225k | 🌍 Fully Remote | ⏱ Full-time (40–50 hrs/wk)</div>
              </v-card>

            </v-col>
        </v-row>
      </div>
    </div>

    <div v-else>
      <div class="" v-if="jobKey === 'metadata-curation-specialist'">
        <div class="text-h3 mb-4">Metadata Curation Specialist — OpenAlex</div>

        <div class="text-subtitle1 mb-8">💵 $70k | 🌍 Fully Remote | ⏱ Full-time (40–50 hrs/wk)</div>

        <p class="text-body1 mb-3">We're a small nonprofit on a big mission: inspired by the Library of Alexandria, we're building a universal, open catalog of research information. OpenAlex already covers 280M+ papers, billions of citations, and millions of authors, journals, and more. Our code is open source, our data is free, and our values are rooted in openness, creativity, kindness, and action.</p>

        <p class="text-body1 mb-3">But we need help making sure all this information is accurate! That's where you come in:</p>

        <p class="text-body1 mb-3">We're hiring a <b>Metadata Curation Specialist</b> to improve the quality of research metadata in OpenAlex. You'll work to manually correct the accuracy of metadata on our works, authors, affiliations, and (especially) funders.</p>

        <p class="text-body1 mb-4">You'll report directly to our CEO Jason Priem and work closely with COO Kyle Demes, plus collaborate tightly with the entire OpenAlex team.</p>

        <div class="text-h6 mb-3">What you'll do</div>

        <ul class="text-body1 mb-4">
          <li class="mb-2"><b>Curate open research metadata</b>: Review and clean metadata in OpenAlex (before and after ingest). Funder metadata is a big focus, and will take 50% of your time.</li>
          <li class="mb-2"><b>Support community curation</b>: Moderate incoming curation requests from users.</li>
          <li class="mb-2"><b>Support automation</b>: Help identify repetitive tasks that can be scaled into automated processes.</li>
          <li class="mb-2"><b>Collaborate across roles</b>: Partner with the Senior Engineer and Funding Community Manager to ensure metadata is both technically sound and useful to funders.</li>
        </ul>

        <div class="text-h6 mb-3">What we're looking for</div>

        <ul class="text-body1 mb-4">
          <li class="mb-2"><b>Attention to detail</b>—balanced by pragmatism and knowing when good enough is good enough.</li>
          <li class="mb-2"><b>Comfort with repetitive work</b>—balanced by the curiosity and creativity to make processes more efficient where you can.</li>
          <li class="mb-2"><b>Great self-management</b> and comfort working hard in a small, agile, fast-moving, distributed team.</li>
          <li class="mb-2"><b>Experience in scholarly communication</b>: as a librarian, researcher, or similar.</li>
          <li class="mb-2"><b>Excitement, motivation, and commitment</b> to our mission to create an accurate, fully-open catalog of research information</li>
        </ul>

        <p class="text-body1 mb-3">If you're looking for meaningful, impactful curation work at the heart of open science, this role is for you.</p>

        <p class="text-body1">👉 To learn more or express interest in the role, email <a href="mailto:kyle@ourresearch.org">kyle@ourresearch.org</a></p>

      </div>

      <div class="" v-if="jobKey === 'funding-community-manager'">
        <div class="text-h3 mb-4">Funding Community Manager — OpenAlex</div>

        <div class="text-subtitle1 mb-8">💵 $90k | 🌍 Fully Remote | ⏱ Full-time (40–50 hrs/wk)</div>

        <p class="text-body1 mb-3">We're a small nonprofit on a big mission: inspired by the Library of Alexandria, we're building a universal, open database of research information. OpenAlex already covers 280M+ papers, billions of citations, and millions of authors, journals, and more. Our code is open source, our data is free, and our values are rooted in openness, creativity, kindness, and action.</p>

        <p class="text-body1 mb-3">We're looking to expand our coverage of grant metadata, and for that we need to build community with research funders. That's where you fit in!</p>

        <p class="text-body1 mb-4">We're hiring a Funding Community Manager to lead and grow our collaborations with research funders globally. You'll be the bridge between our technical team and the funders shaping the future of research. You'll report directly to our CEO Jason Priem and work closely with our COO Kyle Demes, plus collaborate tightly with the entire OpenAlex team.</p>

        <div class="text-h6 mb-3">What you'll do</div>

        <ul class="text-body1 mb-4">
          <li class="mb-2"><b>Build relationships</b>: Connect, listen, and care for our collaborating funders, both as partners and as people.</li>
          <li class="mb-2"><b>Bridge technical and user communities</b>: Work closely with the Senior Engineer and Metadata Specialist to ensure technical and community goals stay aligned, turning funder needs into actionable product specs for our technical team.</li>
          <li class="mb-2"><b>Host events</b>: Lead the design and implementation of annual in-person and virtual workshops with research funders, as well as informational webinars</li>
          <li class="mb-2"><b>Grow community</b>: Grow into managing broader OpenAlex community partnerships (e.g., Universities, governments, researchers, companies).</li>
        </ul>

        <div class="text-h6 mb-3">What we're looking for</div>

        <ul class="text-body1 mb-4">
          <li class="mb-2">An <b>outgoing, empathetic, great listener</b> who loves collaboration</li>
          <li class="mb-2"><b>Scholarly ecosystem experience</b> especially with funders or libraries</li>
          <li class="mb-2"><b>Great self-management</b> and comfort working hard in a small, agile, fast-moving, distributed team.</li>
          <li class="mb-2"><b>Curiosity, flexibility, and eagerness to learn</b>—we're a small, agile, hardworking team where everyone pitches in to do everything.</li>
          <li class="mb-2"><b>Excitement, motivation, and commitment</b> to our mission to create an accurate, fully-open catalog of research information</li>
        </ul>

        <p class="text-body1 mb-3">If you're excited about connecting people, shaping global infrastructure, and advancing open science, this is the role for you.</p>

        <p class="text-body1">👉 To learn more or express interest in the role, email <a href="mailto:kyle@ourresearch.org">kyle@ourresearch.org</a></p>

      </div>

      <div class="" v-if="jobKey === 'senior-engineer-funding-metadata'">

        <div class="text-h3 mb-4">Senior Engineer, Funding Metadata— OpenAlex</div>

        <div class="text-subtitle1 mb-8">💵 $225k | 🌍 Fully Remote | ⏱ Full-time (40–50 hrs/wk)</div>

        <p class="text-body1 mb-3">We're a small nonprofit on a big mission: inspired by the Library of Alexandria, we're building a universal, open database of research information. OpenAlex already covers 280M+ papers, billions of citations, and millions of authors, journals, and more. Our code is open source, our data is free, and our values are rooted in openness, creativity, kindness, and action.</p>

        <p class="text-body1 mb-4">Now we're hiring a <b>Senior Data Engineer</b> to lead technical efforts enriching OpenAlex with <b>grant and funder metadata</b>—creating the world's first comprehensive and completely open database for research funding intelligence. You'll report directly to our CEO (Jason Priem) and work closely with our Wellcome grant PI & COO (Kyle Demes), plus collaborate tightly with the entire OpenAlex team. This is a critical role for our growth and a rare opportunity to shape global open research infrastructure.</p>

        <div class="text-h6 mb-3">What you'll do</div>

        <ul class="text-body1 mb-4">
          <li class="mb-2"><b>Ingest funder data</b>: Work directly with research funders to integrate grant datasets and impact reports—both public and not-yet-public.</li>
          <li class="mb-2"><b>Ensure quality</b>: Partner with the Metadata Curation Specialist to maintain data quality at the standard OpenAlex users expect.</li>
          <li class="mb-2"><b>Find funding mentions</b>: Parse acknowledgement sections of tens of millions of open access scientific articles to identify mentions of research funders.</li>
          <li class="mb-2"><b>Design scalable pipelines</b>: After piloting with early funders, advise on processes and best practices to scale globally.</li>
          <li class="mb-2"><b>Build infrastructure</b>: Coordinate with Casey and Artem to integrate funder metadata into our Databricks environment and APIs.</li>
          <li class="mb-2"><b>Collaborate with funders</b>: Partner with the Funding Community Manager to understand funder needs, translate technical constraints, and design solutions that solve funder needs.</li>
          <li class="mb-2"><b>Solve problems fast</b>: Debug, troubleshoot, and resolve issues relating to funder metadata.</li>
          <li class="mb-2"><b>Stay hands-on</b>: Tackle a wide range of data engineering tasks as our fast-moving project evolves.</li>
        </ul>

        <div class="text-h6 mb-3">What we're looking for</div>

        <ul class="text-body1 mb-4">
          <li class="mb-2">A creative, resourceful engineer who thrives in lean, action-oriented teams</li>
          <li class="mb-2">Strong technical skills in large-scale data pipelines and integrations
            <ul class="mt-2">
              <li>Python, Heroku, Elasticsearch, S3, EC2</li>
              <li>ETL on sketchy data (we'll be working with "formatted" funder data from random spreadsheets, websites, Word docs, pdfs etc)</li>
              <li>NLP and NER, especially using generative AI</li>
              <li>Building modern AI pipelines at huge scale</li>
              <li>Apache Spark and Databricks</li>
            </ul>
          </li>
          <li class="mb-2">Ideally, experience with research funding metadata (or determination to master it)</li>
          <li class="mb-2">Motivation rooted in the promise of making research information open</li>
        </ul>

        <p class="text-body1 mb-3">If you've ever wanted to take a moonshot for open research, this is it.</p>

        <p class="text-body1">👉 To learn more or express interest in the role, email <a href="mailto:kyle@ourresearch.org">kyle@ourresearch.org</a></p>

      </div>

      <v-btn to="/careers" large color="primary" class="mt-8">‹ All careers</v-btn>
    </div>
  </v-container>
</template>

<script>

export default {
  name: "Careers",
  metaInfo() {
    return {
      title: "Careers"
    }
  },
  props: {
    jobKey: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
</style>