<template>
  <v-container class="about mt-12 pt-12">
    <DIV class="text-h3 mb-6">Our company</DIV>

    <div class="text-h4 mb-4">Our contact info</div>
    <p>You can get in touch with us via email at <a href="mailto:team@ourresearch.org">team@ourresearch.org.</a> We're
      also on Twitter at
      <a href="https://twitter.com/ourresearch_org">@OurResearch_org</a> if that's more your speed.
    </p>

    <div class="text-h4 mb-4 mt-12">Our team</div>
    <div class="text-h5 mb-4 mt-4">Full-time staff</div>


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
          the field of altmetrics--coining the term, authoring the influential <a href="https://altmetrics.org">Altmetrics
          Manifesto,</a> and convening the
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
          <div>Senior developer</div>
          <div>
            <a href="https://twitter.com/unpaywall_dev">Twitter</a>
          </div>
          <div class="body">
            Richard is a man of few words. He holds a BS in Computer Engineering from the University of Florida. <a
              href="https://blog.ourresearch.org/welcome-to-our-newest-team-member/">More about Richard.</a>
          </div>
        </div>
      </v-col>
    </v-row>


    <!--    SCOTT  -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/lOFSxfO.jpg"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div>
          <div class="headline">Scott Chamberlain</div>
          <div>Lead developer and Product Owner, Unsub</div>
          <div>
            <a href="https://twitter.com/sckottie">Twitter</a>
          </div>
          <div class="body">
            Scott has been working on Open Science for the past decade, including open source software with <a
              href="https://ropensci.org/">rOpenSci</a> and knowledge discovery with <a
              href="https://openknowledgemaps.org/">Open Knowledge Maps.</a> He holds a BS in Biology from CSU, Chico,
            and a MA and Ph.D. in Ecology & Evolutionary Biology from Rice University. <a
              href="https://blog.ourresearch.org/joining-ourresearch-to-work-on-unsub/">More about Scott</a>
          </div>
        </div>
      </v-col>
    </v-row>



    <!--    CASEY  -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/yxCfUoc.jpg"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div>
          <div class="headline">Casey Meyer</div>
          <div>Senior developer</div>
          <div>
          </div>
          <div class="body">
            Casey holds a BS in Political Science from the University of California, Davis, and an MA in Global Security
            Studies from American Military University. He has a background in cyber security with the US Air Force and
            nine years experience as a software engineer. <a
              href="https://blog.ourresearch.org/meet-casey-now-full-time-with-ourresearch/">More about Casey.</a>


          </div>
        </div>
      </v-col>
    </v-row>


    <div class="text-h5 mb-4 mt-12">Part-time / contract staff</div>

    <!--    JABER  -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/gDHElsd.png"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div>
          <div class="headline">Jaber Al</div>
          <div>Accounts (part-time/contract)</div>
          <div>
          </div>
          <div class="body">
            Jaber uses his education - a degree in accounting with minors in French Literature and German Philosophy -
            and his professional experience from over 7 years of accounting practice, as the foundation of his work.
            Inspired by his own multicultural background, he prides himself on effective communication, a determined
            work ethic, and puts a strong emphasis on human connection in order to develop loyal relationships and help
            clients from all around the world overcome any challenge they may come to him with. A lifelong learner,
            outside of work Jaber enjoys flying aircraft as a recreational pilot, cooking, and hiking around his home in
            Victoria BC.
          </div>
        </div>
      </v-col>
    </v-row>


    <!--    STEVE  -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/AobXJaI.jpg"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div>
          <div class="headline">Steve Gruber</div>
          <div>Sales (part-time/contract)</div>
          <div>
          </div>
          <div class="body">
            Steve is a sales consultant for OurResearch. He co-founded VA Partners and has over 25 years of professional
            sales, marketing, and business development experience in Canada and the USA. He has dramatically increased
            sales at growing companies in a range of industries from business software, IT, telecom, clean-tech, fintech
            and industrial sectors. Steve loves selling and the thrill of the close!


          </div>
        </div>
      </v-col>
    </v-row>


    <div class="text-h4 mb-4 pt-12 mt-12">Our board</div>
    <p>Our board has five members. One of the members is Jason (profiled above). One board member slot is
      currently vacant and we're looking to fill it. Here are the others:</p>


    <!--    HEATHER -->
    <v-row>
      <v-col cols="2">
        <v-img
            src="https://i.imgur.com/6kAg7x5.png"
            aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <div class="headline">Heather Piwowar</div>
        <div>Co-founder and board member</div>
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
            Heather Joseph is the Executive Director of the Scholarly Publishing and Academic Resources Coalition
            (SPARC) and the convener of the Alliance for Taxpayer Access. Prior to coming to SPARC, she spent 15 years
            as a publisher in both commercial and not-for-profit publishing organizations. She served as the publishing
            director at the American Society for Cell Biology, which became the first journal to commit its full content
            to the NIH’s pioneering open repository, PubMed Central. Heather has served on the Board of Directors of
            numerous not-for-profit organizations, including the Public Library of Science. She is a frequent speaker
            and writer on scholarly communications in general, and on open access in particular.
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
            Ethan White studies data-intensive problems in ecology including ecological forecasting and using remote
            sensing to understand individual level patterns in ecological systems at large scales. He is actively
            involved in communities focused on computational training, open science, and EDI as a Data Carpentry
            co-founder, Ecological Forecasting Initiative founding member and steering committee member, and co-founder
            of the weecology interdisciplinary research group.


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
<style lang="scss">
.v-image {
  border-radius: 5px !important;
}

</style>