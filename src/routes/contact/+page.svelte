<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Label } from "$lib/components/ui/label";
  import * as Card from "$lib/components/ui/card";
  import { enhance } from '$app/forms';
  import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-svelte";

  let { form } = $props();
  let isSubmitting = $state(false);
</script>

<svelte:head>
  <title>Hubungi Kami - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto px-4 py-16 max-w-6xl">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    
    <!-- Contact Information -->
    <div class="space-y-8">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight mb-4">Hubungi Kami</h1>
        <p class="text-xl text-muted-foreground">
          Punya pertanyaan tentang sertifikasi Halal di Taiwan? Tim kami siap membantu Anda di setiap langkah proses.
        </p>
      </div>

      <div class="space-y-6">
        <div class="flex items-start space-x-4">
          <div class="mt-1 bg-primary/10 p-2 rounded-full">
            <Mail class="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 class="font-bold">Email</h3>
            <p class="text-muted-foreground">info@halal-ima-taiwan.org</p>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <div class="mt-1 bg-primary/10 p-2 rounded-full">
            <Phone class="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 class="font-bold">Telepon</h3>
            <p class="text-muted-foreground">+886 (02) 1234-5678</p>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <div class="mt-1 bg-primary/10 p-2 rounded-full">
            <MapPin class="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 class="font-bold">Kantor</h3>
            <p class="text-muted-foreground">
              No. 123, Section 4, Roosevelt Rd,<br />
              Da’an District, Taipei City, Taiwan 106
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <Card.Root class="shadow-lg border-primary/10 bg-card/50 backdrop-blur">
      <Card.Header>
        <Card.Title>Kirim Pesan</Card.Title>
        <Card.Description>Isi formulir di bawah ini dan kami akan menghubungi Anda dalam waktu 24-48 jam.</Card.Description>
      </Card.Header>
      <Card.Content>
        {#if form?.success}
          <div class="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <CheckCircle2 class="h-16 w-16 text-green-500" />
            <h3 class="text-2xl font-bold">Pesan Terkirim!</h3>
            <p class="text-muted-foreground">Terima kasih telah menghubungi kami. Kami akan meninjau pertanyaan Anda dan segera merespons.</p>
            <Button variant="outline" onclick={() => window.location.reload()}>Kirim Pesan Lain</Button>
          </div>
        {:else}
          <form 
            method="POST" 
            use:enhance={() => {
              isSubmitting = true;
              return async ({ update }) => {
                await update();
                isSubmitting = false;
              };
            }} 
            class="space-y-4"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="name">Nama Lengkap</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div class="space-y-2">
                <Label for="email">Alamat Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="subject">Subjek</Label>
              <Input id="subject" name="subject" placeholder="Bagaimana kami bisa membantu?" required />
            </div>

            <div class="space-y-2">
              <Label for="message">Pesan</Label>
              <Textarea id="message" name="message" placeholder="Detail pertanyaan Anda di sini..." class="min-h-[150px]" required />
            </div>

            <Button type="submit" class="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
            </Button>
            
            {#if form?.error}
              <p class="text-sm text-red-500 mt-2">{form.error}</p>
            {/if}
          </form>
        {/if}
      </Card.Content>
    </Card.Root>

  </div>
</div>
