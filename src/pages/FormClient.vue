<template>
  <div class="d-flex justify-content-center">
    <div class="card col-6 mt-3">
      <form @submit.prevent="saveClient">
        <div class="card-header">
          <span v-if="form.id">Editar Cliente</span><span v-else>Cadastrar Cliente</span>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="nome" class="form-label">Nome Completo</label>
            <input
              type="text"
              class="form-control"
              id="nome"
              name="nome"
              v-model="form.nome"
              required
            />
          </div>
          <div class="mb-3">
            <label for="nascimento" class="form-label">Data de Nascimento</label>
            <input
              type="date"
              class="form-control"
              id="nascimento"
              name="nascimento"
              v-model="form.nascimento"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model="form.email"
              :class="{'is-invalid': !validEmail && form.email !== ''}"
              @blur="validateEmail"
              required
            />
            <div v-if="!validEmail && form.email !== ''" class="invalid-feedback">
              E-mail inválido.
            </div>
          </div>
          <div class="mb-3">
            <label for="telefone" class="form-label">Telefone</label>
            <input
              type="tel"
              class="form-control"
              id="telefone"
              name="telefone"
              v-model="form.telefone"
              :class="{'is-invalid': !validTelefone && form.telefone !== ''}"
              @blur="validateTelefone"
              required
            />
            <div v-if="!validTelefone && form.telefone !== ''" class="invalid-feedback">
              Telefone inválido. Use o formato (XX) XXXXX-XXXX.
            </div>
          </div>
          <div class="mb-3">
            <label for="cpf" class="form-label">CPF</label>
            <input
              type="text"
              class="form-control"
              id="cpf"
              name="cpf"
              v-model="form.cpf"
              :class="{'is-invalid': !validCpf && form.cpf !== ''}"
              @blur="validateCpf"
              required
            />
            <div v-if="!validCpf && form.cpf !== ''" class="invalid-feedback">
              CPF inválido. Use o formato XXX.XXX.XXX-XX.
            </div>
          </div>
          <div class="mb-3">
            <label for="endereco" class="form-label">Endereço</label>
            <textarea
              class="form-control"
              id="endereco"
              name="endereco"
              v-model="form.endereco"
              :class="{'is-invalid': !validEndereco && form.endereco !== ''}"
              @blur="validateEndereco"
              required
            ></textarea>
            <div v-if="!validEndereco && form.endereco !== ''" class="invalid-feedback">
              O endereço deve ter pelo menos 10 caracteres.
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-primary" :disabled="!formIsValid">
            {{ form.id ? 'Salvar' : 'Cadastrar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../firebaseDB";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css"; // Certifique-se de que os estilos do toast estão importados

export default {
  name: "ClientForm",
  data() {
    return {
      form: {
        id: null,
        nome: "",
        nascimento: "",
        email: "",
        telefone: "",
        cpf: "",
        endereco: "",
      },
      validEmail: true,
      validTelefone: true,
      validCpf: true,
      validEndereco: true,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.form.nome &&
        this.form.nascimento &&
        this.validEmail &&
        this.validTelefone &&
        this.validCpf &&
        this.validEndereco
      );
    },
  },
  async created() {
    this.form.id = this.$route.query.id;
    if (this.form.id) {
      await this.fetchClient(this.form.id);
    }
  },
  methods: {
    async fetchClient(id) {
      const docRef = doc(db, "clientes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.form = { id, ...docSnap.data() };
      } else {
        console.log("No such document!");
      }
    },
    saveClient() {
      if (this.form.id) {
        this.updateClient();
      } else {
        this.insertClient();
      }
    },
    async insertClient() {
      try {
        await addDoc(collection(db, "clientes"), {
          nome: this.form.nome,
          nascimento: this.form.nascimento,
          email: this.form.email,
          telefone: this.form.telefone,
          cpf: this.form.cpf,
          endereco: this.form.endereco,
        });
        this.clearForm();
        this.makeToast();
        setTimeout(() => {
          this.$router.push({ name: "listclient" });
        }, 2000); // Atraso de 2 segundos para permitir que o toast seja visto
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async updateClient() {
      try {
        const docRef = doc(db, "clientes", this.form.id);
        await updateDoc(docRef, {
          nome: this.form.nome,
          nascimento: this.form.nascimento,
          email: this.form.email,
          telefone: this.form.telefone,
          cpf: this.form.cpf,
          endereco: this.form.endereco,
        });
        this.makeToast("Cliente atualizado com sucesso!");
        setTimeout(() => {
          this.$router.push({ name: "listclient" });
        }, 2000); // Atraso de 2 segundos para permitir que o toast seja visto
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    clearForm() {
      this.form.nome = "";
      this.form.nascimento = "";
      this.form.email = "";
      this.form.telefone = "";
      this.form.cpf = "";
      this.form.endereco = "";
    },
    makeToast(message = "Salvo com Sucesso") {
      toast.success(message, {
        autoClose: 5000,
      });
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.validEmail = emailRegex.test(this.form.email);
    },
    validateTelefone() {
      const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      this.validTelefone = telefoneRegex.test(this.form.telefone);
    },
    validateCpf() {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      this.validCpf = cpfRegex.test(this.form.cpf);
    },
    validateEndereco() {
      this.validEndereco = this.form.endereco.length >= 10;
    },
  },
};
</script>
