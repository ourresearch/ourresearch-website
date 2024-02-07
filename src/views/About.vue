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
        name: "Casey Meyer",
        img: "https://i.imgur.com/yxCfUoc.jpg",
        title: "CTO",
        fte: "full-time",
        links: [
          {
            anchor: "Intro blog post",
            href: "https://blog.ourresearch.org/meet-casey-now-full-time-with-ourresearch",
          },
        ],
        bio: "Casey is a software engineer, father of three, and a former US Air Force officer. He has a background in cyber security and holds a BS in Political Science from the University of California, Davis, and an MA in Global Security Studies from American Military University."
      },

      {
        name: "Jason Portenoy",
        img: require("@/assets/team/jasport_cropped2_thumb.jpg"),
        title: "Senior data engineer",
        fte: "full-time",
        links: [
          {
            anchor: "Personal website",
            href: "https://www.jasport.org/",
          },
          {
            anchor: "Intro blog post",
            href: "https://blog.ourresearch.org/introducing-jason-portenoy-newest-full-time-team-member-at-openalex",
          },
        ],
        bio: "Dr. Jason Portenoy is a data engineer, data scientist, and researcher on the science of science. He has a bachelor's degree in neuroscience from Brown University, and a PhD in Information Science from the University of Washington."
      },

      {
        name: "Kyle Demes",
        img: require("@/assets/team/kyle_headshot_thumb.jpg"),
        title: "VP of Research Intelligence",
        fte: "full-time",
        links: [
        ],
        bio: "Using data to make better decisions drives Kyle. A former marine ecologist, he has spent the last 9 years working with governments and universities on developing and implementing data-driven research strategies. His spare time is split between his communities and the shorelines and mountains near Vancouver."
      },

      {
        name: "Justin Barrett",
        img: require("@/assets/team/Justin_Barrett_headshot_cropped.png"),
        title: "Machine Learning Engineer",
        fte: "full-time",
        bio: "Justin is a machine learning engineer and data scientist who loves problem-solving. He graduated from NC State University with a B.S. in Aerospace Engineering and later received an M.S. in Mechanical Engineering. In his free time, Justin enjoys playing soccer and exploring Europe with his wife."
      },

      {
        name: "Nolan McCafferty",
        img: require("@/assets/team/nolanheadshot.jpeg"),
        title: "Software Engineer",
        fte: "full-time",
        bio: "Nolan is a software and data engineer with 8 years of experience. He has a bachelor’s degree in Computer Engineering from the University of Iowa and is an Iowa City native."
      },

      {
        name: "Jason Ding",
        img: require("@/assets/team/jasonding.png"),
        title: "CFO",
        fte: "part-time",
        bio: "Jason founded Notion CPA and has over 15+ years of senior finance and accounting experience.  He has served as a Chief Financial officer for publicly traded companies and his firm works extensively as a fractional CFO and fractional accounting service for several for-profit and non-profit organizations looking to grow and reach their goals.  Notion CPA has instilled professional cadence, accounting management and reporting measures for companies across North America.  Jason gets excited when he sees other people reach their goals and succeed."
      },

      {
        name: "Steve Gruber",
        img: "https://i.imgur.com/AobXJaI.jpg",
        title: "Sales",
        fte: "part-time",
        bio: "Steve co-founded VA Partners and has over 25 years of professional sales, marketing, and business development experience in Canada and the USA. He has dramatically increased sales at growing companies in a range of industries from business software, IT, telecom, clean-tech, fintech and industrial sectors. Steve loves selling and the thrill of the close!"
      },

      {
        name: "Madhuri Tripathi",
        img: "@/assets/team/mtripathi_thumb.jpg",
        title: "Business Development Representative",
        fte: "part-time",
        bio: "Madhuri comes to OurResearch with experience in sales and content writing in the finance industry. Her educational background is versatile with a Bachelor’s in Commerce, MBA in finance and marketing, and a post graduate diploma in Strategic Marketing Communications from Conestoga College. Throughout her journey, both in education and experience, her focus has been finding value which contributes to her zeal to excel in sales."
      },

      {
        name: "Ragini Mandava",
        img: require("@/assets/team/ragini.jpg"),
        title: "Data curation",
        fte: "part-time",
        bio: "Ragini is based in India and holds a Master's in Pharmacy from JNTU University. She has 10 years of experience in data research and data entry in Amazon services."
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