export const yellow = '#FFC000';

export const settings = {
  size: {
    name: 'Размер',
    object: 'sizes',
    title: 'Выберите размер сендвича'
  },
  bread: {
    name: 'Хлеб',
    object: 'breads',
    title: 'Хлеб для сендвича на выбор'
  },
  vegetable: {
    name: 'Овощи',
    object: 'vegetables',
    title: 'Дополнительные овощи бесплатно',
    multiple: true
  },
  sauce: {
    name: 'Соус',
    object: 'sauces',
    title: 'Выберите 3 бесплатных соуса по вкусу',
    multiple: true
  },
  filling: {
    name: 'Начинка',
    object: 'fillings',
    title: 'Добавьте начинку по вкусу',
    multiple: true
  },
  finish: {
    name: 'Готово!',
    object: 'ready',
    title: 'Проверьте и добавьте в корзину'
  }
};

export const switcherTable = {
  pizza: { content: 'Пицца', id: 'menu-switcher-pizza-button' },
  shaurma: { content: 'Шаурма', id: 'menu-switcher-shaurma-button' },
  sandwiches: { content: 'Сендвичи', id: 'menu-switcher-sandwiches-button' },
  burgers: { content: 'Бургеры', id: 'menu-switcher-burgers-button' },
  chicken: { content: 'Курица & Картофель', id: 'menu-switcher-chicken-button' },
  salads: { content: 'Тортилья & Салаты', id: 'menu-switcher-salads-button' },
  drinks: { content: 'Напитки & Десерты', id: 'menu-switcher-drinks-button' }
};
