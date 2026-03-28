import { useEffect, useMemo, useState } from "react";
import { ClassCard } from "../../components/cards/ClassCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AppShell } from "../../components/layout/AppShell";
import { api } from "../../services/api";
import type { ClassItem } from "../../types/class";

const categories = [
  "Todas",
  "Smartphone",
  "Internet",
  "Emprego",
  "Segurança",
  "Cidadania digital",
];

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadClasses() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await api.get<ClassItem[]>("/classes");
        setClasses(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Não foi possível carregar as aulas.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadClasses();
  }, []);

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const matchesCategory =
        selectedCategory === "Todas" || item.category === selectedCategory;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [classes, search, selectedCategory]);

  return (
    <AppShell>
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeader
          badge="Catálogo de aulas"
          title="Encontre uma aula para começar sua jornada digital"
          description="Escolha aulas com linguagem simples e apoio humanizado."
        />
      </section>

      <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <input
            placeholder="Buscar aula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-2xl border border-slate-300 px-4 py-3"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>

      {isLoading ? (
        <p className="text-center">Carregando aulas...</p>
      ) : errorMessage ? (
        <EmptyState title="Erro" description={errorMessage} />
      ) : filteredClasses.length === 0 ? (
        <EmptyState
          title="Nenhuma aula encontrada"
          description="Tente outro filtro"
        />
      ) : (
        <section className="grid gap-6 xl:grid-cols-2">
          {filteredClasses.map((item) => (
            <ClassCard key={item._id} item={item} />
          ))}
        </section>
      )}
    </AppShell>
  );
}