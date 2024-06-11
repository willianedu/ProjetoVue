<template>
  <div>
    <div
      id="carouselExampleIndicators"
      class="carousel slide full-width-carousel"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../assets/imgs/Car1.jpg"
            class="d-block w-100 carousel-img"
            alt="Slide 1"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/imgs/Car2.jpg"
            class="d-block w-100 carousel-img"
            alt="Slide 2"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/imgs/Car3.jpeg"
            class="d-block w-100 carousel-img"
            alt="Slide 3"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="content">
      <section class="intro">
        <h1>Bem-vindo à Nossa Página</h1>
        <p>Aqui você encontra as melhores ofertas e produtos.</p>
      </section>

      <section class="features">
        <div class="feature">
          <h2>Veículos Novos</h2>
          <img src="../assets/imgs/Car2.jpg" alt="Veículos Novos" />
          <p>Explore nossa vasta seleção de veículos novos.</p>
        </div>
        <div class="feature">
          <h2>Veículos Usados</h2>
          <img src="../assets/imgs/Celta.jpg" alt="Veículos Usados" />
          <p>Descubra nossos veículos usados de alta qualidade.</p>
        </div>
        <div class="feature">
          <h2>Serviços de Manutenção</h2>
          <img src="../assets/imgs/manutencao.jpg" alt="Serviços de Manutenção" />
          <p>Agende serviços de manutenção para o seu veículo.</p>
        </div>
        <div class="feature">
          <h2>Financiamento</h2>
          <img src="../assets/imgs/financiar.jfif" alt="Financiamento" />
          <p>Conheça nossas opções de financiamento flexíveis.</p>
        </div>
      </section>

      <section class="testimonials">
        <h2 class="titulo__depoimento">Depoimentos de Clientes</h2>
        <div class="testemunhas">
          <div class="testimonial">
            <img src="../assets/imgs/cliente3.jfif" alt="Cliente 1" />
            <p>"Excelente atendimento e variedade de veículos. Recomendo!"</p>
            <span>- João Silva</span>
          </div>
          <div class="testimonial">
            <img src="../assets/imgs/cliente2.jpg" alt="Cliente 2" />
            <p>"Encontrei o carro dos meus sonhos nesta loja. Obrigado!"</p>
            <span>- Maria Oliveira</span>
          </div>
        </div>
      </section>

      <section class="contact">
        <h2>Contato</h2>
        <p>Entre em contato conosco pelo email: contato@empresa.com</p>
      </section>
    </div>

    <footer>
      <div class="footer-content">
        <p class="copy">
          &copy; 2024 Nome da Empresa. Todos os direitos reservados.
        </p>
        <div class="social-icons">
          <a href="#"><img src="../assets/imgs/face.png" alt="Facebook" /></a>
          <a href="#"><img src="../assets/imgs/twitter.png" alt="Twitter" /></a>
          <a href="#"><img src="../assets/imgs/insta.png" alt="Instagram" /></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.full-width-carousel {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.carousel-inner {
  width: 100vw;
}

.carousel-img {
  height: 70vh;
  width: 100%;
  object-fit: cover;
}

.content {
  text-align: center;
  margin: 20px;
}

.intro,
.features,
.testimonials,
.contact {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.testimonials {
  flex-wrap: wrap;
  justify-content: space-around;
}
.testemunhas {
  display: flex;
  margin-top: 3em;
}

.feature {
  background-color: white;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  flex: 1;
}
.titulo__depoimento {
  text-align: center;
}
.testimonial {
  background-color: white;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  flex: 1;
  text-align: center;
}

.contact {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

h1,
h2 {
  color: red;
}

p {
  color: black;
}

footer {
  background-color: black;
  color: white;
  padding: 20px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-icons img {
  width: 30px;
  height: 30px;
  margin-right: 2em;
  margin-left: 1em;
}
.feature img{
  width: 100%;
  height: 200px; /* Fixa a altura para todas as imagens */
  object-fit: cover; /* Mantém a proporção das imagens */
}
.testimonial img {
  width:50%;
  height: 250px;
  object-fit: cover;
}
.copy {
  color: white;
  margin-left: 2em;
}
</style>
