<script lang="ts">
  import dwLogo from "../assets/circular_logosvg.svg";
  let { title, desc, dateRange, link, showUrl } = $props<{
    title: string;
    desc: string;
    link: string;
    showUrl: string;
  }>();
</script>

<div class="flex flex-col gap-2">
  <div class="flex flex-row gap-4">
    <img src={dwLogo.src} alt="Wisarut's Logo" class="w-8" />
    <div class="flex flex-col gap-0">
      <h1>dwisarut-portfolio</h1>
      <a href={link} class="font-light text-[14px]">{showUrl}</a>
    </div>
  </div>

  <div class="flex flex-row justify-between">
    <a href={link} class="hover:underline">
      <h1 class="font-semibold text-2xl">{title}</h1>
    </a>
  </div>

  <p class="font-normal text-[16px]">
    {desc}
  </p>
</div>
