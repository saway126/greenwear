<template>
  <footer class="py-10 border-t border-white/10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <img src="/logo.svg" class="w-6 h-6" alt="GreenWear" />
        <span class="text-sm text-neutral-400">© {{ new Date().getFullYear() }} GreenWear</span>
      </div>
      <div class="text-sm text-neutral-400">
        <a href="https://github.com/saway126/greenwear" target="_blank" class="hover:text-neutral-200">GitHub</a>
        <span class="mx-2 opacity-30">•</span>
        <a href="/privacy" class="hover:text-neutral-200">Privacy</a>
      </div>
    </div>
  </footer>
</template>
