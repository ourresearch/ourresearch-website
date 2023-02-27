<template>
  <v-container class="about mt-12 pt-12">
    <DIV class="text-h3 mb-6">Team</DIV>

    <p>
      Ever since our start at an all-night hackathon in 2010, we've believed that small teams can create great things. We've grown a bit since then, but we've tried to maintain our commitment to staying small, fun, and energetic.
    </p>
    <p>
      If you'd like to join our team, or to get in contact for any reason, <a href="mailto:team@ourresearch.org">drop us a line!</a>
    </p>


    <div class="grey--text mt-6 mb-4">Alphabetical order; click person for more details.</div>

    <div class="d-flex flex-wrap">
      <person-card
          v-for="person in displayPeople"
          :key="person.name"
          :person="person"
      />
    </div>





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
        title: "CEO & frontend dev",
        fte: "full-time",
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
        name: "Richard Orr",
        img: "https://i.imgur.com/N9WkG2x.png",
        title: "Senior developer",
        fte: "full-time",
        links: [
          {
            anchor: "Twitter",
            href: "https://twitter.com/unpaywall_dev",
          },
          {
            anchor: "Intro blog post",
            href: "https://blog.ourresearch.org/welcome-to-our-newest-team-member/",
          },
        ],
        bio: "Richard is a man of few words. He holds a BS in Computer Engineering from the University of Florida."
      },


      {
        name: "Casey Meyer",
        img: "https://i.imgur.com/yxCfUoc.jpg",
        title: "Senior developer",
        fte: "full-time",
        links: [
          {
            anchor: "Intro blog post",
            href: "https://blog.ourresearch.org/meet-casey-now-full-time-with-ourresearch",
          },
        ],
        bio: "Casey holds a BS in Political Science from the University of California, Davis, and an MA in Global Security Studies from American Military University. He has a background in cyber security with the US Air Force and nine years experience as a software engineer."
      },

      {
        name: "Jason Ding",
        img: require("@/assets/team/jasonding.png"),
        title: "CFO",
        fte: "part-time",
        bio: "Jason founded Notion CPA and has over 15+ years of senior finance and accounting experience.  He has served as a Chief Financial officer for publicly traded companies and his firm works extensively as a fractional CFO and fractional accounting service for several for-profit and non-profit organizations looking to grow and reach their goals.  Notion CPA has instilled professional cadence, accounting management and reporting measures for companies across North America.  Jason gets excited when he sees other people reach their goals and succeed."
      },

      {
        name: "Jaber Al",
        img: "https://i.imgur.com/gDHElsd.png",
        title: "Accounts",
        fte: "part-time",
        bio: "Jaber uses his education - a degree in accounting with minors in French Literature and German Philosophy - and his professional experience from over 7 years of accounting practice, as the foundation of his work. Inspired by his own multicultural background, he prides himself on effective communication, a determined work ethic, and puts a strong emphasis on human connection in order to develop loyal relationships and help clients from all around the world overcome any challenge they may come to him with. A lifelong learner, outside of work Jaber enjoys flying aircraft as a recreational pilot, cooking, and hiking around his home in Victoria BC.."
      },

      {
        name: "Steve Gruber",
        img: "https://i.imgur.com/AobXJaI.jpg",
        title: "Sales",
        fte: "part-time",
        bio: "Steve co-founded VA Partners and has over 25 years of professional sales, marketing, and business development experience in Canada and the USA. He has dramatically increased sales at growing companies in a range of industries from business software, IT, telecom, clean-tech, fintech and industrial sectors. Steve loves selling and the thrill of the close!"
      },

      {
        name: "Ayesha Jalil",
        img: "https://i.imgur.com/YoXoqUo.jpg",
        title: "Sales",
        fte: "part-time",
        bio: "Ayesha is a self-drive challenge seeker.  She believes that learning is for life.  One of the most transformative experiences of her career was at SalesLab, an elite Tech Sales Bootcamp that helped her develop strong business intelligence, prospecting and cold-calling skills.  To Ayesha, selling is about integrity, empathy and authenticity.   "
      },

      {
        name: "Mercy Wanja",
        img: require("@/assets/team/IMG-20221102-WA0007-cropped.jpg"),
        title: "Customer Support",
        fte: "part-time",
        bio: "Mercy is a Kenyan based multi-faceted individual with vast experience in research and data analysis. She's passionate about deriving insights and simplifying data sets. She's also passionate about the environment and empowering women."
      },

      {
        name: "Heather Piwowar",
        img: "https://i.imgur.com/6kAg7x5.png",
        title: "Cofounder & board",
        fte: "volunteer",
        links: [
          {
            anchor: "Twitter",
            href: "https://twitter.com/researchremix",
          },
          {
            anchor: "Google Scholar",
            href: "https://scholar.google.ca/citations?user=1YLq0XMAAAAJ&hl=en",
          },
        ],
        bio: "A longtime advocate for Open Science, Dr. Heather Piwowar is also a leading researcher in research data availability and reuse, including a seminal paper measuring the citation benefit of publicly available research data. Dr Piwowar has a bachelor’s and master’s degree from MIT in electrical engineering, 10 years of experience as a software engineer, and a Ph.D. in Biomedical Informatics."
      },

      {
        name: "Heather Joseph",
        img: "https://i.imgur.com/vbixgnn.png",
        title: "Board",
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
        links: [
          {
            anchor: "Twitter",
            href: "https://twitter.com/ethanwhite",
          },
        ],
        bio: "Ethan White studies data-intensive problems in ecology including ecological forecasting and using remote sensing to understand individual level patterns in ecological systems at large scales. He is actively involved in communities focused on computational training, open science, and EDI as a Data Carpentry co-founder, Ecological Forecasting Initiative founding member and steering committee member, and co-founder of the weecology interdisciplinary research group."
      },
    ]
  }),
  computed: {
    displayPeople(){
      const ret = [...this.people]
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

</style>