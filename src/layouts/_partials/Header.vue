<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="../../assets/imgs/Logo.png" alt="Logo" class="logo">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                aria-expanded="false">Lista</a>
              <ul class="dropdown-menu">
                <li class="nav-item">
                  <router-link class="dropdown-item" to="/listclient">Clientes</router-link>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li class="nav-item">
                  <router-link class="dropdown-item" to="/listproduct">Produtos</router-link>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li class="nav-item">
                  <router-link class="dropdown-item" to="/listfornecedor">Fornecedores</router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                aria-expanded="false">Cadastro</a>
              <ul class="dropdown-menu">
                <li class="nav-item">
                  <router-link class="dropdown-item" to="/formclient">Clientes</router-link>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li class="nav-item">
                  <router-link class="dropdown-item" to="/formproduct">Produtos</router-link>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li class="nav-item">
                  <router-link class="dropdown-item" to="/formfornecedor">Fornecedores</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.logo {
  height: 40px;
  max-height: 40px;
  width: auto;
}

.navbar {
  background-color: black;
}

.nav-link {
  color: white !important;
}
</style>
