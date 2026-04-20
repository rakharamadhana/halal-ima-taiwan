<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { ArrowLeft, FilePlus } from 'lucide-svelte';

	let { form } = $props();

	type ScopeCategory =
		| 'Warung Makan'
		| 'Restoran'
		| 'Supplier Daging'
		| 'Hotel'
		| 'Tempat Wisata'
		| '';

	type IngredientRow = {
		ingredient_name: string;
		supplier_name: string;
		origin_country: string;
		halal_cert_body: string;
		halal_cert_number: string;
		halal_cert_expiry: string;
	};

	type ProductRow = {
		product_name: string;
		brand: string;
		product_category: string;
		estimated_monthly_volume: string;
		production_site: string;
		ingredients: IngredientRow[];
	};

	const scopeCategories: Exclude<ScopeCategory, ''>[] = [
		'Warung Makan',
		'Restoran',
		'Supplier Daging',
		'Hotel',
		'Tempat Wisata'
	];

	const makeIngredient = (): IngredientRow => ({
		ingredient_name: '',
		supplier_name: '',
		origin_country: '',
		halal_cert_body: '',
		halal_cert_number: '',
		halal_cert_expiry: ''
	});

	const makeProduct = (): ProductRow => ({
		product_name: '',
		brand: '',
		product_category: '',
		estimated_monthly_volume: '',
		production_site: '',
		ingredients: [makeIngredient()]
	});

	let currentStep = $state(1);
	let requestedScope = $state<ScopeCategory>('');
	let productionFlow = $state('');
	let cleaningProcedure = $state('');
	let qualityControl = $state('');
	let criticalRiskPoints = $state('');

	let scopeAnswers = $state({
		warung_menu_mix: '',
		warung_shared_utensils: '',
		resto_kitchen_zoning: '',
		resto_central_kitchen: '',
		meat_slaughterhouse_name: '',
		meat_cold_chain: '',
		hotel_breakfast_supply: '',
		hotel_room_service_alcohol_policy: '',
		tourism_food_tenant_control: '',
		tourism_prayer_facility: ''
	});

	let products = $state<ProductRow[]>([makeProduct()]);

	const hasChosenScope = $derived(requestedScope !== '');

	function goToStep(step: number) {
		currentStep = step;
	}

	function nextStep() {
		if (currentStep < 3) currentStep += 1;
	}

	function previousStep() {
		if (currentStep > 1) currentStep -= 1;
	}

	function addProductRow() {
		products = [...products, makeProduct()];
	}

	function removeProductRow(productIndex: number) {
		if (products.length === 1) return;
		products = products.filter((_, i) => i !== productIndex);
	}

	function addIngredientRow(productIndex: number) {
		products = products.map((product, index) =>
			index === productIndex
				? { ...product, ingredients: [...product.ingredients, makeIngredient()] }
				: product
		);
	}

	function removeIngredientRow(productIndex: number, ingredientIndex: number) {
		products = products.map((product, index) => {
			if (index !== productIndex) return product;
			if (product.ingredients.length === 1) return product;
			return {
				...product,
				ingredients: product.ingredients.filter((_, i) => i !== ingredientIndex)
			};
		});
	}
</script>

<svelte:head>
	<title>Form Sertifikasi Produk - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-8">
	<div class="mb-6">
		<Button href="/dashboard" variant="outline" size="sm" class="gap-2">
			<ArrowLeft class="h-4 w-4" /> Kembali ke Dashboard
		</Button>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Form Permohonan Sertifikasi Produk</Card.Title>
			<Card.Description>
				Form dibagi 3 langkah agar proses pengisian lebih jelas dan terstruktur.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/registerProduct" enctype="multipart/form-data" class="space-y-6">
				<div class="grid gap-2 md:grid-cols-3">
					<Button type="button" variant={currentStep === 1 ? 'default' : 'outline'} onclick={() => goToStep(1)}
						>1. Specific Audit</Button
					>
					<Button
						type="button"
						variant={currentStep === 2 ? 'default' : 'outline'}
						disabled={!hasChosenScope}
						onclick={() => goToStep(2)}>2. Products & Ingredients</Button
					>
					<Button type="button" variant={currentStep === 3 ? 'default' : 'outline'} onclick={() => goToStep(3)}
						>3. Production & Controls</Button
					>
				</div>

				{#if currentStep === 1}
					<div class="space-y-2">
						<label class="text-sm font-medium" for="requested_scope">Kategori / Scope Sertifikasi</label>
						<select
							id="requested_scope"
							name="requested_scope"
							bind:value={requestedScope}
							required
							class="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background"
						>
							<option value="" disabled>Pilih kategori terlebih dahulu</option>
							{#each scopeCategories as scope}
								<option value={scope}>{scope}</option>
							{/each}
						</select>
					</div>
					{#if !hasChosenScope}
						<div class="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
							Silakan pilih kategori terlebih dahulu untuk menampilkan pertanyaan audit.
						</div>
					{:else}
						<div class="space-y-3 rounded-lg border p-4">
							<h3 class="text-base font-semibold">Pertanyaan Audit Spesifik Scope</h3>
							{#if requestedScope === 'Warung Makan'}
								<div class="grid gap-3 md:grid-cols-2">
									<div class="space-y-2">
										<label class="text-sm font-medium" for="warung_menu_mix"
											>Bagaimana pemisahan menu Halal dan non-Halal?</label
										>
										<Textarea
											id="warung_menu_mix"
											bind:value={scopeAnswers.warung_menu_mix}
											placeholder="Jelaskan kebijakan menu dan display makanan"
											rows={3}
										/>
									</div>
									<div class="space-y-2">
										<label class="text-sm font-medium" for="warung_shared_utensils"
											>Apakah alat masak dipakai silang? Jika ya, bagaimana kontrolnya?</label
										>
										<Textarea
											id="warung_shared_utensils"
											bind:value={scopeAnswers.warung_shared_utensils}
											placeholder="Jelaskan SOP pencucian/pemisahan alat"
											rows={3}
										/>
									</div>
								</div>
							{:else if requestedScope === 'Restoran'}
								<div class="grid gap-3 md:grid-cols-2">
									<div class="space-y-2">
										<label class="text-sm font-medium" for="resto_kitchen_zoning"
											>Bagaimana zoning dapur untuk mencegah kontaminasi?</label
										>
										<Textarea
											id="resto_kitchen_zoning"
											bind:value={scopeAnswers.resto_kitchen_zoning}
											placeholder="Area prep, cook, plating, storage"
											rows={3}
										/>
									</div>
									<div class="space-y-2">
										<label class="text-sm font-medium" for="resto_central_kitchen"
											>Apakah memakai central kitchen/cloud kitchen? Jelaskan kontrolnya.</label
										>
										<Textarea
											id="resto_central_kitchen"
											bind:value={scopeAnswers.resto_central_kitchen}
											placeholder="Traceability batch dan distribusi outlet"
											rows={3}
										/>
									</div>
								</div>
							{:else if requestedScope === 'Supplier Daging'}
								<div class="grid gap-3 md:grid-cols-2">
									<div class="space-y-2">
										<label class="text-sm font-medium" for="meat_slaughterhouse_name"
											>Nama RPH/slaughterhouse dan status sertifikat Halal</label
										>
										<Input
											id="meat_slaughterhouse_name"
											bind:value={scopeAnswers.meat_slaughterhouse_name}
											placeholder="Nama RPH dan negara asal"
										/>
									</div>
									<div class="space-y-2">
										<label class="text-sm font-medium" for="meat_cold_chain"
											>Bagaimana kontrol cold chain dari impor hingga distribusi?</label
										>
										<Textarea
											id="meat_cold_chain"
											bind:value={scopeAnswers.meat_cold_chain}
											placeholder="Suhu penyimpanan, log transport, segregasi produk"
											rows={3}
										/>
									</div>
								</div>
							{:else if requestedScope === 'Hotel'}
								<div class="grid gap-3 md:grid-cols-2">
									<div class="space-y-2">
										<label class="text-sm font-medium" for="hotel_breakfast_supply"
											>Sumber bahan untuk buffet/sarapan hotel</label
										>
										<Textarea
											id="hotel_breakfast_supply"
											bind:value={scopeAnswers.hotel_breakfast_supply}
											placeholder="Supplier utama, rotasi menu, item berisiko tinggi"
											rows={3}
										/>
									</div>
									<div class="space-y-2">
										<label class="text-sm font-medium" for="hotel_room_service_alcohol_policy"
											>Kebijakan room service terkait alkohol/non-halal</label
										>
										<Textarea
											id="hotel_room_service_alcohol_policy"
											bind:value={scopeAnswers.hotel_room_service_alcohol_policy}
											placeholder="Pisah alat, tray, penyimpanan, SOP pelayanan"
											rows={3}
										/>
									</div>
								</div>
							{:else if requestedScope === 'Tempat Wisata'}
								<div class="grid gap-3 md:grid-cols-2">
									<div class="space-y-2">
										<label class="text-sm font-medium" for="tourism_food_tenant_control"
											>Kontrol tenant makanan/minuman di area wisata</label
										>
										<Textarea
											id="tourism_food_tenant_control"
											bind:value={scopeAnswers.tourism_food_tenant_control}
											placeholder="Kriteria tenant, verifikasi dokumen, audit berkala"
											rows={3}
										/>
									</div>
									<div class="space-y-2">
										<label class="text-sm font-medium" for="tourism_prayer_facility"
											>Ketersediaan fasilitas ibadah dan informasi Halal</label
										>
										<Textarea
											id="tourism_prayer_facility"
											bind:value={scopeAnswers.tourism_prayer_facility}
											placeholder="Musholla, penunjuk arah, edukasi pengunjung muslim"
											rows={3}
										/>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				{:else if currentStep === 2}
					<div class="space-y-3 rounded-lg border p-4">
						<div class="flex items-center justify-between">
							<h3 class="text-base font-semibold">Produk dan Daftar Bahan per Produk</h3>
							<Button type="button" size="sm" variant="outline" onclick={addProductRow}>
								Tambah Produk
							</Button>
						</div>
						{#each products as product, productIndex}
							<div class="space-y-4 rounded-lg border p-4">
								<div class="flex items-center justify-between">
									<h4 class="font-semibold">Produk #{productIndex + 1}</h4>
									<Button type="button" variant="ghost" size="sm" onclick={() => removeProductRow(productIndex)}>
										Hapus Produk
									</Button>
								</div>
								<div class="grid gap-3 md:grid-cols-2">
									<Input
										bind:value={product.product_name}
										placeholder="Nama produk"
										required={productIndex === 0}
									/>
									<Input bind:value={product.brand} placeholder="Merek" />
									<Input bind:value={product.product_category} placeholder="Kategori produk" />
									<Input bind:value={product.estimated_monthly_volume} placeholder="Volume/bulan" />
									<Input class="md:col-span-2" bind:value={product.production_site} placeholder="Lokasi produksi" />
								</div>

								<div class="space-y-3 rounded-md border border-dashed p-3">
									<div class="flex items-center justify-between">
										<p class="text-sm font-medium">Ingredients untuk produk ini</p>
										<Button
											type="button"
											size="sm"
											variant="outline"
											onclick={() => addIngredientRow(productIndex)}
										>
											Tambah Ingredient
										</Button>
									</div>
									{#each product.ingredients as ingredient, ingredientIndex}
										<div class="space-y-3 rounded-md border p-3">
											<div class="grid gap-3 md:grid-cols-3">
												<Input
													bind:value={ingredient.ingredient_name}
													placeholder="Nama bahan"
													required={productIndex === 0 && ingredientIndex === 0}
												/>
												<Input bind:value={ingredient.supplier_name} placeholder="Nama pemasok" />
												<Input bind:value={ingredient.origin_country} placeholder="Negara asal bahan" />
												<Input bind:value={ingredient.halal_cert_body} placeholder="Lembaga sertifikasi Halal" />
												<Input bind:value={ingredient.halal_cert_number} placeholder="No sertifikat bahan" />
												<Input type="date" bind:value={ingredient.halal_cert_expiry} />
											</div>
											<div class="grid gap-3 md:grid-cols-2">
												<div class="space-y-1">
													<label
														class="text-xs font-medium text-muted-foreground"
														for={`ingredient-file-${productIndex}-${ingredientIndex}`}
													>
														Upload sertifikat Halal bahan (per bahan)
													</label>
													<Input
														id={`ingredient-file-${productIndex}-${ingredientIndex}`}
														name="ingredient_cert_files"
														type="file"
														accept=".pdf,.jpg,.jpeg,.png"
													/>
												</div>
												<div class="flex items-end justify-end">
													<Button
														type="button"
														variant="ghost"
														size="sm"
														onclick={() => removeIngredientRow(productIndex, ingredientIndex)}
													>
														Hapus Ingredient
													</Button>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="grid gap-4 md:grid-cols-2">
						<div class="space-y-2">
							<label class="text-sm font-medium" for="production_flow">Alur proses produksi</label>
							<Textarea
								id="production_flow"
								name="production_flow"
								bind:value={productionFlow}
								placeholder="Ringkasan alur dari penerimaan bahan hingga pengemasan"
								rows={4}
							/>
						</div>
						<div class="space-y-2">
							<label class="text-sm font-medium" for="cleaning_procedure"
								>Prosedur pembersihan & pencegahan kontaminasi</label
							>
							<Textarea
								id="cleaning_procedure"
								name="cleaning_procedure"
								bind:value={cleaningProcedure}
								placeholder="Pisahkan alat/line, jadwal sanitasi, dsb."
								rows={4}
							/>
						</div>
						<div class="space-y-2">
							<label class="text-sm font-medium" for="quality_control">Sistem kontrol mutu internal</label>
							<Textarea
								id="quality_control"
								name="quality_control"
								bind:value={qualityControl}
								placeholder="PIC Halal, titik verifikasi, dokumentasi rutin"
								rows={4}
							/>
						</div>
						<div class="space-y-2">
							<label class="text-sm font-medium" for="critical_risk_points"
								>Titik kritis risiko non-halal</label
							>
							<Textarea
								id="critical_risk_points"
								name="critical_risk_points"
								bind:value={criticalRiskPoints}
								placeholder="Contoh: emulsifier, flavor, shared line, supplier baru"
								rows={4}
							/>
						</div>
					</div>
				{/if}

				<input type="hidden" name="products_json" value={JSON.stringify(products)} />
				<input type="hidden" name="scope_specific_json" value={JSON.stringify(scopeAnswers)} />

				{#if form?.message}
					<p class={`text-sm ${form?.success ? 'text-green-600' : 'text-red-600'}`}>{form.message}</p>
				{/if}

				<div class="flex items-center justify-between gap-2">
					<div class="flex gap-2">
						<Button type="button" variant="outline" onclick={previousStep} disabled={currentStep === 1}>
							Sebelumnya
						</Button>
						{#if currentStep < 3}
							<Button type="button" onclick={nextStep} disabled={currentStep === 1 && !hasChosenScope}>
								Berikutnya
							</Button>
						{/if}
					</div>
					<Button href="/dashboard" type="button" variant="outline">Batal</Button>
					<Button type="submit" class="gap-2" disabled={!hasChosenScope || currentStep !== 3}>
						<FilePlus class="h-4 w-4" />
						Kirim Permohonan Sertifikasi
					</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
