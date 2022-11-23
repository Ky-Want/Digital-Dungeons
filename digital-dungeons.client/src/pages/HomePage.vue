<template>
  <section class="home d-flex flex-column">
    <div class="title-container d-flex justify-content-center px-5">
      <div class="DD-border text-center pt-1">
        <h1 class="DD-title text-shadow"><span class="">WELCOME TO DIGITAL DUNGEONS</span></h1>
      </div>
    </div>


    <div
      class="cards-container justify-content-around align-items-center d-flex flex-wrap flex-grow-1 animate__animated animate__fadeIn">
      <router-link :to="{ name: 'Campaigns' }">
        <div class="theme-card campaigns elevation-3">
          <div class="on-md-hover text-visible">
            <span class="popup-text">Campaigns</span>
          </div>
        </div>
      </router-link>


      <router-link :to="{ name: 'Information' }">
        <div class="theme-card information elevation-3">
          <div class="on-md-hover text-visible">
            <span class="popup-text">Information</span>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>





<script>
export default {
  setup() {
    return {

    }
  }
}
</script>





<style scoped lang="scss">
.home {
  height: 100vh;
  position: relative;
}

.title-container {
  margin-top: 5rem;
  margin-bottom: 3rem;
}

.popup-text {
  font-size: 48px;
}

.theme-card {
  height: 40vh;
  width: 18rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 150ms linear;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.theme-card:hover {
  transform: scale(1.1);
}

.campaigns {
  background-image: url("https://www.kotaku.com.au/wp-content/uploads/sites/3/2022/08/23/dungeons-dragons-starter-set-adventure-e1661234095525.jpeg?quality=80&resize=1280,720");
  background-position: center;
  background-size: cover;
}

.information {
  // https://i.pinimg.com/originals/da/72/e6/da72e6588befda673cc0fcdf64a49e40.jpg
  background-image: url("https://artfiles.alphacoders.com/113/113838.jpg");
  background-position: center;
  background-size: cover;
}



.DD-title {
  font-family: "Morpheus";
  src: local("Morphues") url(./fonts/MORPHEUS.TTF) format("truetype");
}

.text-shadow {
  color: rgb(121, 129, 34);
  text-shadow: 1px 1px rgb(88, 27, 27), 0px 0px 5px rgb(105, 41, 115);
  font-weight: bold;
  letter-spacing: 0.08rem
}

.DD-border {
  border-top: 6px solid;
  border-bottom: 6px solid;
  border-color: rgba(130, 129, 25, 0.749);
  width: fit-content;
}

@media (min-width: 768px) {
  .theme-card {
    background-size: cover;
    background-position: center;
    background-color: black;
    height: 50vh;
    width: 24rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .on-md-hover {
    transition: all 0.2s linear;
    opacity: 0;
    pointer-events: none;
  }

  *:hover>.on-md-hover {
    opacity: 1;
    pointer-events: all;
  }
}

@media (min-width: 1200px) {
  .theme-card {
    background-size: cover;
    background-position: center;
    background-color: black;
    height: 60vh;
    width: 32rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
