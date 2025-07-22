<template>
  <div
    class="offcanvas offcanvas-start MainSideBar text-white"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span class="fs-4">Site Navigation:</span>
      </a>
      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body d-flex flex-column justify-content-between p-3">
      <ul class="InnerSideBar nav nav-pills flex-column mb-auto">
        <li class="nav-item Links" data-bs-dismiss="offcanvas">
          <router-link
            to="/home"
            class="nav-link text-info"
            active-class="active"
            aria-current="page"
          >
            Home
          </router-link>
        </li>
        <li class="Links" data-bs-dismiss="offcanvas">
          <router-link
            to="/employees"
            class="nav-link text-white"
            active-class="active"
          >
            Employee Dashboard
          </router-link>
        </li>
        <li class="Links" data-bs-dismiss="offcanvas">
          <router-link
            to="/payroll"
            class="nav-link text-white"
            active-class="active"
          >
            Payroll Regulation
          </router-link>
        </li>
        <li class="Links" data-bs-dismiss="offcanvas">
          <router-link
            to="/timeoff"
            class="nav-link text-white"
            active-class="active"
          >
            Timeoff Requests
          </router-link>
        </li>
        <li class="Links" data-bs-dismiss="offcanvas">
          <router-link
            to="/review"
            class="nav-link text-white"
            active-class="active"
          >
            Performance Reviews
          </router-link>
        </li>
      </ul>

      <hr class="hrNav" />

      <div class="dropdown p-3">
        <a
          href="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://png.pngtree.com/png-vector/20220529/ourmid/pngtree-blue-user-icon-profile-and-account-vector-design-vector-sign-vector-png-image_46129432.jpg"
            alt="User Avatar"
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <!-- <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li> -->
          <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="signOut" data-bs-dismiss="offcanvas">
                Sign out
              </a>
            </li>
          <li><hr class="dropdown-divider" /></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    signOut() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.MainSideBar {
  width: 280px;
  min-height: 100vh;
  background: linear-gradient(to bottom, #0c2c47 55%, #7ea1af 100%);
  border-right: #0b273e solid;
}

.hrNav {
  color: #00070d;
}

.Links a {
  margin: 20px;
}
</style>
