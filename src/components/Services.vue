<script setup>
import { RouterLink } from 'vue-router';


const props = defineProps({
  title : String,
})
</script>

<template>
  <section class="py-32 lg:py-24 sm:py-32 mb-0" id="services">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h1 class="bg-white dark:bg-egray mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{{ title }}</span></h1>

        <div class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-2">
          
        <div class="relative lg:row-span-2">
          <RouterLink to="/projects/dev">
<div class="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem] max-lg:rounded-t-[2rem] hover:bg-gray-200 hover:shadow-lg transition-all duration-300" />
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] ">
            <div class="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
              <p class="mt-2 text-2xl font-bold tracking-tight text-gray-950 max-lg:text-center">Web Development</p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Experienced in building large-scale web applications, with expertise in both backend and frontend development.</p>
            </div>
            <div class="relative min-h-[30rem] w-full grow">
              <div class="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                  <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                    <div class="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">Backend</div>
                    <div class="border-r border-gray-600/10 px-4 py-2">Frontend</div>
                  </div>
                </div>
                <div class="text-white px-6 pb-14">
                  <pre class="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
<code>
<span class="text-orange-400">&lt;?php

namespace</span> App\Http\Middleware;

<span class="text-orange-400">use</span> Closure;
<span class="text-orange-400">use</span> Illuminate\Http\Request;
<span class="text-orange-400">use</span> Illuminate\Support\Facades\Context;
<span class="text-orange-400">use</span> Illuminate\Support\Str;
<span class="text-orange-400">use</span> Symfony\Component\HttpFoundation\Response;

<span class="text-orange-400">class</span> <span class="text-blue-300">AddContext</span>
{<span class="text-green-300">
    /**
     * Handle an incoming request.
     */
    </span>
    public function handle(Request $request, Closure $next): Response
    {
        Context::add('url', $request-&gt;url());
        Context::add('trace_id', Str::uuid()-&gt;toString());

        return $next($request);
    }
}
</code>
</pre>

                </div>
              </div>
            </div>
          </div>
        
        </RouterLink>
        </div>
          
        
        <div class="relative max-lg:row-start-2 lg:col-start-2 lg:row-start-1">
          <RouterLink to="/projects/mobile">
          <div class="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
            <div class="px-8 pt-8 sm:px-10 sm:pt-10">
              <p class="mt-2 text-2xl font-bold tracking-tight text-gray-950 max-lg:text-center">Mobile Development</p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">I have experience building Mobile apps, still continuously expanding my skills to deliver quality solutions.</p>
            </div>
            <div class="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
              <div class="absolute border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[300px] top-38 shadow-xl">
                  <div class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                  <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                  <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                  <div class="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                  <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                      <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-2-light.png" class="dark:hidden w-[272px] h-[572px]" alt="">
                      <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-2-dark.png" class="hidden dark:block w-[272px] h-[572px]" alt="">
                  </div>
              </div>
            </div>
          </div>
        </RouterLink>
        </div>
        <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
        <RouterLink to="/projects/video-editing">
          <div class="absolute inset-px rounded-lg bg-white lg:rounded-br-[2rem] max-lg:rounded-b-[2rem]" />
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
            <div class="px-8 pt-8 sm:px-10 sm:pt-10">
              <p class="mt-2 text-2xl font-bold tracking-tight text-gray-950 max-lg:text-center">Video Editing</p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Efficient with Premiere Pro and making short form content videos with special effects.</p>
            </div>
            <div class="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
              <img 
  class="hidden lg:block absolute size-80 top-28 left-52 object-cover object-center"
  src="../assets/images/editing_ill.svg"
  alt=""
/>
            </div>
          </div>
        </RouterLink>
        </div>
      </div>
      
    </div>
  </section>
</template>
