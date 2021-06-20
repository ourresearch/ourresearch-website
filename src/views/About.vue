<template>
  <v-container class="about mt-12 pt-12">
    <DIV class="text-h3 mb-6">Our company</DIV>

    <div class="text-h4 mb-4">Our contact info</div>
    <p>You can get in touch with us via email at <a href="mailto:team@ourresearch.org">team@ourresearch.org.</a> We're
      also on Twitter at
      <a href="https://twitter.com/ourresearch_org">@OurResearch_org</a> if that's more your speed.
    </p>

    <div class="text-h4 mb-4 mt-12">Our team</div>


    <!--    HEATHER -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/eIhbvLm.png"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div class="headline">Heather Piwowar</div>
        <div>Co-founder</div>
        <div>
          <a href="https://twitter.com/researchremix">Twitter</a>
          |
          <a href="https://scholar.google.ca/citations?user=1YLq0XMAAAAJ&hl=en">Google Scholar</a>
          |
          <a href="https://docs.google.com/document/d/1S7aKmG_l3wJxAc4lb5gJYMwNVDnAT7HlQWcaXADwA1s/edit#">speaker
            bio</a>
        </div>
        <div class="body">
          A longtime advocate for Open Science, Dr. Heather Piwowar is also a leading researcher in research data
          availability and reuse, including a seminal paper measuring the citation benefit of publicly available
          research data. Dr Piwowar has a bachelor’s and master’s degree from MIT in electrical engineering, 10 years of
          experience as a software engineer, and a Ph.D. in Biomedical Informatics.
        </div>

      </v-col>
    </v-row>

    <!--    JASON  -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/DjocEJI.png"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div class="headline">Jason Priem</div>
        <div>Co-founder</div>
        <div>
          <a href="https://twitter.com/jasonpriem">Twitter</a>
          |
          <a href="https://scholar.google.ca/citations?user=w32jC0YAAAAJ&hl=en">Google Scholar</a>
          |
          <a href="https://docs.google.com/document/d/1SkUuOYrpfUF-LC7aC1sBa_phG-_qN-f3hkL9fMooTm4/edit#">speaker
            bio</a>
        </div>
        <div class="body">
          As an Information Science PhD student at the University of North Carolina at Chapel Hill, Jason helped create
          the field of altmetrics--coining the term, authoring the influential Altmetrics Manifesto, and convening the
          first altmetrics workshops. He holds a BA in history and MEd in education, both from the University of
          Florida.
        </div>

      </v-col>
    </v-row>

    <!--    RICHARD  -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/N9WkG2x.png"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div>
          <div class="headline">Richard Orr</div>
          <div>Lead developer, Unpaywall</div>
          <div>
            <a href="https://twitter.com/unpaywall_dev">Twitter</a>
          </div>
          <div class="body">
            Richard is a man of few words. He holds a BS in Computer Engineering from the University of Florida.
          </div>
        </div>
      </v-col>
    </v-row>

    <div class="text-h4 mb-4 mt-12">Our board</div>
    <p>Our board has five members. Two of the members are Jason and Heather (profiled above). One board member slot is currently vacant and we're looking to fill it. Here are the others:</p>




    <!--    HEATHER JOSEPH  -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/vbixgnn.png"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div>
          <div class="headline">Heather Joseph</div>
          <div>Board member</div>
          <div>
            <a href="https://twitter.com/hjoseph?lang=en">Twitter</a>
          </div>
          <div class="body">
            Heather Joseph is the Executive Director of the Scholarly Publishing and Academic Resources Coalition (SPARC) and the convener of the Alliance for Taxpayer Access. Prior to coming to SPARC, she spent 15 years as a publisher in both commercial and not-for-profit publishing organizations. She served as the publishing director at the American Society for Cell Biology, which became the first journal to commit its full content to the NIH’s pioneering open repository, PubMed Central. Heather has served on the Board of Directors of numerous not-for-profit organizations, including the Public Library of Science. She is a frequent speaker and writer on scholarly communications in general, and on open access in particular.
          </div>
        </div>
      </v-col>
    </v-row>


    <!--    ETHAN WHITE  -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/C1V6N3k.png"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div>
          <div class="headline">Ethan White</div>
          <div>Board member</div>
          <div>
            <a href="https://twitter.com/ethanwhite?lang=en">Twitter</a>
          </div>
          <div class="body">
            Ethan White studies data-intensive problems in ecology including ecological forecasting and using high resolution remote sensing to understand individual level patterns in ecological systems at large scales. He is actively involved in computational training efforts as a Data Carpentry founder, The Carpentries Executive Committee member, and lead developer of the semester long Data Carpentry course.


          </div>
        </div>
      </v-col>
    </v-row>




  </v-container>
</template>
<script>
export default {
  name: "About",
  metaInfo() {
    return {
      title: "About"
    }
  },
}
</script>
