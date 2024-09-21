import { useRouter } from 'next/router';
import { useState } from 'react';

const CategorySearch = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue) {
      router.push(`/?categoryId=${inputValue}`); // Cambia la URL con el nuevo categoryId
    }
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ingrese ID de categoría"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default CategorySearch;