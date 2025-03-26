<template>
  <header class="header">
    <div class="wrapper">
      <nav class="nav">
        <RouterLink to="/" class="nav-link">Cursos</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.header {
  background: #1f2937;
  padding: 1rem 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav {
  display: flex;
  gap: 1.5rem;
  text-align: center;
}

.nav-link {
  font-size: 1rem;
  color: #f3f4f6;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s ease, color 0.3s ease;
}

.nav-link:hover {
  background: #374151;
  color: #fff;
}

.router-link-exact-active {
  background: #2563eb;
  color: white;
  font-weight: bold;
  border-radius: 6px;
}

@media (min-width: 1024px) {
  .wrapper {
    justify-content: flex-start;
    padding: 0 2rem;
  }
}
</style>
