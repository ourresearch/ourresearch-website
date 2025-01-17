<template>
  <v-container class="about mt-12 pt-12">
    <DIV class="text-h3 mb-6">Team</DIV>

    <p>
      Ever since our start at an all-night hackathon in 2010, we've believed that small teams can create great things. We've grown a bit since then, but we've tried to maintain our commitment to staying small, fun, and energetic.
    </p>
    <p>
      If you'd like to join our team, or to get in contact for any reason, <a href="mailto:team@ourresearch.org">drop us a line!</a>
    </p>

    <div class="text-h5">Staff</div>
    <div class="text-subtitle-1">Our paid full-time and contract staff handle day-to-day operations.</div>
    <div class="d-flex flex-wrap">
      <person-card
          v-for="person in displayPeople('staff')"
          :key="person.name"
          :person="person"
          class="person-card"
      />
    </div>

    <div class="text-h5">Board of Directors</div>
    <div class="text-subtitle-1">Our volunteer board of directors governs our company.</div>
    <div class="d-flex flex-wrap">
      <person-card
          v-for="person in displayPeople('board')"
          :key="person.name"
          :person="person"
          class="person-card"
      />
    </div>

    <!--
    <div class="text-h5">Advisory Board</div>
    <div class="text-subtitle-1">Our volunteer advisory board represents our community. <a href="https://docs.google.com/document/d/1TVEsfqRLAcNpiZkvFuKoGKVo6FVNwisRsThnz78kgI4/edit?tab=t.0#heading=h.mbrwjopt6w77">Learn more here</a>.</div>
    <div class="d-flex flex-wrap">
      <person-card
          v-for="person in displayPeople('advisory')"
          :key="person.name"
          :person="person"
          class="person-card"
      />
    </div>
    -->

  </v-container>
</template>


<script>
import {projectsList} from "@/data/projectDescriptions";
import {valuesList} from "@/data/valueDescriptions";
import PersonCard from "@/components/PersonCard";


export default {
  name: "Team",
  components: {
    PersonCard,
  },
  data: () => ({
    dialogIsOpen: false,
    people: [
      {
        name: "Jason Priem",
        img: "https://i.imgur.com/DjocEJI.png",
        title: "CEO",
        fte: "full-time",
        categories: ["staff", "board"],
        links: [
          {
            anchor: "Twitter",
            href: "https://twitter.com/jasonpriem",
          },
          {
            anchor: "Google Scholar",
            href: "https://scholar.google.ca/citations?user=w32jC0YAAAAJ&hl=en",
          },
          {
            anchor: "Speaker bio",
            href: "https://docs.google.com/document/d/1SkUuOYrpfUF-LC7aC1sBa_phG-_qN-f3hkL9fMooTm4",
          },
        ],
        bio: "Jason is a longtime advocate for Open Science and open metrics. As a PhD student, he helped create the field of <a href=\"https://en.wikipedia.org/wiki/Altmetrics\">altmetrics</a> by coining the term and authoring the <a href=\"https://altmetrics.org\">Altmetrics Manifesto.</a> He holds a BA in history and MEd in education, both from the University of Florida."
      },

      {
        name: "Casey Meyer",
        img: "https://i.imgur.com/yxCfUoc.jpg",
        title: "CTO",
        fte: "full-time",
        categories: ["staff"],
        links: [
          {
            anchor: "Intro blog post",
            href: "https://blog.ourresearch.org/meet-casey-now-full-time-with-ourresearch",
          },
        ],
        bio: "Casey is a software engineer, father of three, and a former US Air Force officer. He has a background in cyber security and holds a BS in Political Science from the University of California, Davis, and an MA in Global Security Studies from American Military University."
      },

      {
        name: "Kyle Demes",
        img: require("@/assets/team/kyle_headshot_thumb.jpg"),
        title: "COO",
        fte: "full-time",
        categories: ["staff"],
        links: [
        ],
        bio: "Using data to make better decisions drives Kyle. A former marine ecologist, he has spent the last 9 years working with governments and universities on developing and implementing data-driven research strategies. His spare time is split between his communities and the shorelines and mountains near Vancouver."
      },

      {
        name: "Nolan McCafferty",
        img: require("@/assets/team/nolanheadshot.jpeg"),
        title: "Software Engineer",
        fte: "full-time",
        categories: ["staff"],
        bio: "Nolan is a software and data engineer with 8 years of experience. He has a bachelor’s degree in Computer Engineering from the University of Iowa and is an Iowa City native."
      },

      {
        name: "Brett Lockspeiser",
        img: require("@/assets/team/brett-lockspeiser.jpg"),
        title: "Senior Frontend Engineer & Product Owner",
        fte: "full-time",
        categories: ["staff"],
        bio: "Brett Lockspeiser is a software engineer, product designer, and the co-founder of Sefaria, a non-profit organization building a free and open source digital library of Jewish texts. Brett began his career as a product manager at Google where he led the launch of the first Google News Archive. Brett studied Symbolic Systems at Stanford University."
      },

      {
        name: "Steve Gruber",
        img: "https://i.imgur.com/AobXJaI.jpg",
        title: "Sales",
        fte: "part-time",
        categories: ["staff"],
        bio: "Steve co-founded VA Partners and has over 25 years of professional sales, marketing, and business development experience in Canada and the USA. He has dramatically increased sales at growing companies in a range of industries from business software, IT, telecom, clean-tech, fintech and industrial sectors. Steve loves selling and the thrill of the close!"
      },

      {
        name: "Madhuri Tripathi",
        img: require("@/assets/team/mtripathi_thumb.jpg"),
        title: "Business Development Representative",
        fte: "part-time",
        categories: ["staff"],
        bio: "Madhuri comes to OurResearch with experience in sales and content writing in the finance industry. Her educational background is versatile with a Bachelor’s in Commerce, MBA in finance and marketing, and a post graduate diploma in Strategic Marketing Communications from Conestoga College. Throughout her journey, both in education and experience, her focus has been finding value which contributes to her zeal to excel in sales."
      },

      {
        name: "Heather Joseph",
        img: "https://i.imgur.com/vbixgnn.png",
        title: "Board",
        categories: ["board"],
        fte: "volunteer",
        links: [
          {
            anchor: "Twitter",
            href: "https://twitter.com/hjoseph",
          },
        ],
        bio: "Heather Joseph is the Executive Director of the Scholarly Publishing and Academic Resources Coalition (SPARC) and the convener of the Alliance for Taxpayer Access. Prior to coming to SPARC, she spent 15 years as a publisher in both commercial and not-for-profit publishing organizations. She served as the publishing director at the American Society for Cell Biology, which became the first journal to commit its full content to the NIH’s pioneering open repository, PubMed Central. Heather has served on the Board of Directors of numerous not-for-profit organizations, including the Public Library of Science. She is a frequent speaker and writer on scholarly communications in general, and on open access in particular."
      },

      {
        name: "Ethan White",
        img: "https://i.imgur.com/C1V6N3k.png",
        title: "Board",
        fte: "volunteer",
        categories: ["board"],
        links: [
          {
            anchor: "Twitter",
            href: "https://twitter.com/ethanwhite",
          },
        ],
        bio: "Ethan White studies data-intensive problems in ecology including ecological forecasting and using remote sensing to understand individual level patterns in ecological systems at large scales. He is actively involved in communities focused on computational training, open science, and EDI as a Data Carpentry co-founder, Ecological Forecasting Initiative founding member and steering committee member, and co-founder of the weecology interdisciplinary research group."
      },

      {
        name: "Johanna McEntyre",
        img: require("@/assets/team/johanna-mcentyre.jpg"),
        title: "Board",
        fte: "volunteer",
        categories: ["board"],
        links: [
        ],
        bio: "Jo has served as the Deputy Director of the European Bioinformatics Institute since 2024, after serving as an Associate Director of EMBL-EBI Services with responsibility for data resources, and the Team Leader for Literature Services. Prior to joining EMBL-EBI, Jo was a staff scientist at the NCBI, National Library of Medicine, NIH, USA. Jo’s primary focus has been on the integration of the open access literature with life sciences data, to support the development of new ways to access and discover research information. This has led to interests in the areas of text and data mining, curation, and scientific credit and impact systems. She holds a PhD in plant biology from Manchester Metropolitan University."
      },
    ]
  }),
  methods: {
    displayPeople(category){
      const ret = this.people.filter(p => p.categories.includes(category))
      ret.sort(function(a, b){
       const  aLastName = a.name.split(" ")[1]
       const  bLastName = b.name.split(" ")[1]

        return (aLastName > bLastName) ? 1 : -1;
      })
      return ret
    }
  },
  metaInfo() {
    return {
      title: "Team"
    }
  },
}
</script>


<style lang="scss">
.v-image {
  border-radius: 5px !important;
}
.text-h5 {
  margin-top: 40px;
}
.text-subtitle-1 {
  margin-bottom: 15px;
}
.person-card {
  display: flex;
  flex-direction: column;
}

</style>