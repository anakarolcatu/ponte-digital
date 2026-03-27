import { useMemo, useState } from "react";
import { ClassCard } from "../../components/cards/ClassCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SectionHeader } from "../../components/common/SectionHeader";
import { categories, classesMock } from "../../data/classes";
import { AppShell } from "../../components/layout/AppShell";

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredClasses = useMemo(() => {
    return classesMock.filter((item) => {
      const matchesCategory =
        selectedCategory === "Todas" || item.category === selectedCategory;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <AppShell>
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeader
          badge="Catálogo de aulas"
          title="Encontre uma aula para começar sua jornada digital"
          description="Escolha aulas com linguagem simples e apoio humanizado. Você pode buscar por tema ou filtrar pela categoria que mais combina com o que deseja aprender."
        />
      </section>

      <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Buscar aula
            </label>

            <input
              id="search"
              type="text"
              placeholder="Ex.: WhatsApp, e-mail, currículo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Categoria
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Aulas disponíveis
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredClasses.length} aula(s) encontrada(s)
          </p>
        </div>
      </section>

      {filteredClasses.length === 0 ? (
        <EmptyState
          title="Nenhuma aula encontrada"
          description="Tente buscar com outro termo ou selecione uma categoria diferente."
        />
      ) : (
        <section className="grid gap-6 xl:grid-cols-2">
          {filteredClasses.map((item) => (
            <ClassCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </AppShell>
  );
}