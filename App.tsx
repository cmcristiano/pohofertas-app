const filteredProducts = useMemo(() => {
  const now = new Date();

  return PRODUCTS
    .filter((p) => {
      const validade = new Date(p.validity + 'T23:59:59');
      if (validade < now) return false;

      // 🔒 REGRA CORRETA PARA "TUDO"
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      if (
        searchQuery &&
        !p.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => (b.discount || 0) - (a.discount || 0));
}, [activeCategory, searchQuery]);
