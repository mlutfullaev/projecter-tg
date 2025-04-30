<script setup lang="ts">
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import type { IProject } from "@/types/interfaces.ts";
import { ref } from "vue";

const projects = ref<IProject[]>([])
</script>

<template>
  <div>
    <Accordion type="single" collapsible>
      <AccordionItem
        v-for="project in projects"
        :key="project.id"
        :value="project.id"
      >
        <AccordionTrigger>
          <h2 class="text-2xl">{{project.title}}</h2>
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style scoped>

</style>
