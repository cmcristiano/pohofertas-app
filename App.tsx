const filteredProducts = useMemo(() => {
  const now = new Date();

  return PRODUCTS
    .filter((p) => {
      // 🔒 VALIDADE BLINDADA
      if (p.validity) {
        const validade = new Date(p.validity + 'T23:59:59');
        if (isNaN(validade.getTime())) return true; // se der erro, não bloqueia
        if (validade < now) return false;
      }

      // 🔒 CATEGORIA
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      // 🔒 BUSCA
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
