export type Locale = 'id' | 'en';

const STORAGE_KEY = 'halal-ima-locale';

export const i18n = $state({
	locale: 'id' as Locale
});

export function setLocale(locale: Locale) {
	i18n.locale = locale;

	if (typeof document !== 'undefined') {
		document.documentElement.lang = locale;
	}

	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, locale);
	}
}

export function initLocale() {
	if (typeof localStorage === 'undefined') return;

	const savedLocale = localStorage.getItem(STORAGE_KEY);

	if (savedLocale === 'id' || savedLocale === 'en') {
		setLocale(savedLocale);
		return;
	}

	setLocale('id');
}

export function tr(id: string, en: string) {
	return i18n.locale === 'en' ? en : id;
}
