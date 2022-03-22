<template>
  <div class="contacts">
    <h1 class="section-header">Contact Me</h1>
    <div class="c-d">
      <div class="bg10">
        <form @submit.prevent="handleSubmit">
          <input
            type="text"
            class="cont"
            id="name"
            name="firstname"
            placeholder="Name"
            v-model="name"
            required
          /><span class="fa fa-user user"></span> <br />

          <input
            v-model="email"
            type="text"
            id="email"
            class="cont"
            name="email"
            placeholder="Email"
            required
          />
          <span class="fa fa-envelope-o email_icon"></span>
          <br />

          <input
            type="text"
            id="subjecting"
            class="cont"
            name="subject"
            placeholder="Subject"
            v-model="subject"
          />
          <span class="fa fa fa-pencil subject"></span> <br />
          <textarea
            rows="10"
            cols="40"
            id="boxing"
            class="cont"
            placeholder="Message"
            v-model="message"
          ></textarea>
          <span class="fa fa-comment-o comment"></span><br />

          <input type="submit" value="Send a message" id="submit_button" />
        </form>
      </div>

      <div class="direct-contact-container">
        <ul class="contact-list">
          <li class="list-item">
            <span class="contact-text place"
                >Cape Town,South Africa</span
              >
          </li>

          <li class="list-item">
            
              <span class="contact-text phone"
                ><a href="tel:066-267-7072" title="Give me a call"
                  >066 267 7072</a
                ></span
              >
          </li>

          <li class="list-item">
           <span class="contact-text gmail"
                ><a href="mailto:#yaaseendav@gmail.com" title="Send me an email"
                  >yaaseendav@gmail.com</a
                ></span
              >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      name: "",
      message: "",
      subject: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.email, this.name, this.message, this.subject);
      fetch("http://localhost:5000/contact", {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          name: this.name,
          message: this.message,
          subject: this.subject,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => alert(json.msg))
        .catch((e) => alert(e.msg));
    },
  },
};
</script>

<style>
.c-d {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
/* Location, Phone, Email Section */
.contact-list {
  list-style-type: none;
  margin-left: -30px;
  padding-right: 20px;
}

.list-item {
  line-height: 4;
  color: #aaa;
}

.contact-text {
  font: 300 18px "Lato", sans-serif;
  letter-spacing: 1.9px;
  color: #bbb;
}
.section-header{
  text-align: center;
  padding-bottom: 20px;
}
.place {
  margin-left: 50px;
}

.phone {
  margin-left: 50px;
}

.gmail {
  margin-left: 50px;
}

.contact-text a {
  color: #bbb;
  text-decoration: none;
  transition-duration: 0.2s;
}

.contact-text a:hover {
  color: #fff;
  text-decoration: none;
}
.contacts {
  padding: 100px;
  background-color: rgb(13, 13, 13);
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.cont {
  margin: 7px;
  padding: 10px;
  font-size: 12px;
  background-color: rgba(255, 253, 231, 0.1);
  border: 1px solid rgba(236, 239, 241, 0.5);
  width: 400px;
}

.cont:focus {
  transition: 0.5s;
  background-color: rgba(255, 249, 196, 0.2);
  border-color: #cacaca;
  outline: 0;
}

#submit_button {
  width: 405px;
  height: 50px;
  font-size: 16px;
  color: #f5f5f5;
  background-color: rgba(107, 107, 107, 0.5);
  border: 0px;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
}

#submit_button:hover {
  transition: 0.5s;
  background-color: rgba(51, 51, 51, 0.5);
}

textarea::-webkit-input-placeholder {
  color: rgba(245, 245, 245, 1) !important;
}

textarea:-moz-placeholder {
  /* Firefox 18- */
  color: rgba(245, 245, 245, 1) !important;
  opacity: 1;
}

textarea::-moz-placeholder {
  /* Firefox 19+ */
  color: rgba(245, 245, 245, 1) !important;
  opacity: 1;
}

textarea:-ms-input-placeholder {
  color: rgba(245, 245, 245, 1) !important;
}

input::-webkit-input-placeholder {
  color: rgba(245, 245, 245, 1) !important;
}

input:-moz-placeholder {
  /* Firefox 18- */
  color: rgba(245, 245, 245, 1) !important;
  opacity: 1;
}

input::-moz-placeholder {
  /* Firefox 19+ */
  color: rgba(245, 245, 245, 1) !important;
  opacity: 1;
}

input:-ms-input-placeholder {
  color: rgba(245, 245, 245, 1) !important;
}

#boxing {
  font-family: arial;
  color: rgba(245, 245, 245, 1);
  font-size: 13px;
}

.cont:focus {
  color: white;
}

.cont {
  color: white;
}

.user {
  color: white;
  margin-top: 15px;
  position: relative;
  right: 30px;
  z-index: 2;
}

.email_icon {
  color: white;
  margin-top: 15px;
  position: relative;
  right: 35px;
  z-index: 2;
}

.subject {
  color: white;
  margin-top: 15px;
  position: relative;
  right: 35px;
  z-index: 2;
}

.comment {
  color: white;
  margin-top: 15px;
  position: relative;
  overflow: hidden;
  right: 35px;
  bottom: 158px;
  z-index: 2;
}
@media screen and (max-width: 670px) {
  .cont {
    width: 68%;
  }
  #submit_button {
    width: 68%;
  }
}
</style>