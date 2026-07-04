import type { HardwareComponent } from '@/types';

export const hardwareConfig: HardwareComponent[] = [
  {
    id: 'cpu',
    category: 'Процессор',
    title: 'AMD Ryzen 5 5600X',
    value: '6 ядер / 12 потоков · 4.6 ГГц',
    icon: 'cpu',
    description: 'Шестиядерный процессор на архитектуре Zen 3 для игр и многозадачной работы.'
  },
  {
    id: 'gpu',
    category: 'Видеокарта',
    title: 'NVIDIA RTX 3060 ColorFull',
    value: '12 ГБ GDDR6 · Ray Tracing',
    icon: 'gpu',
    description: 'Видеокарта с поддержкой трассировки лучей и DLSS для современных игр.'
  },
  {
    id: 'motherboard',
    category: 'Материнская плата',
    title: 'Gigabyte AORUS B550M Elite',
    value: 'AM4 · PCIe 4.0',
    icon: 'motherboard',
    description: 'Надёжная плата формата mATX с усиленным питанием и поддержкой PCIe 4.0.'
  },
  {
    id: 'ram',
    category: 'Оперативная память',
    title: '16 GB DDR4',
    value: '2 × 8 ГБ · 3200 МГц',
    icon: 'ram',
    description: 'Двухканальная конфигурация памяти для стабильной работы под нагрузкой.'
  },
  {
    id: 'cooling',
    category: 'Охлаждение',
    title: 'DeepCool, башенный кулер',
    value: 'Двухтрубочная башня',
    icon: 'cooling',
    description: 'Эффективное воздушное охлаждение, поддерживающее низкие температуры под нагрузкой.'
  },
  {
    id: 'case',
    category: 'Корпус',
    title: 'Белый панорамный двухкамерный',
    value: 'Закалённое стекло',
    icon: 'case',
    description: 'Двухкамерная компоновка с панорамной стеклянной панелью и хорошим воздушным потоком.'
  },
  {
    id: 'monitor',
    category: 'Монитор',
    title: 'Ardor 24"',
    value: 'Full HD',
    icon: 'monitor',
    description: 'Основной игровой монитор с диагональю 24 дюйма.'
  },
  {
    id: 'keyboard',
    category: 'Клавиатура',
    title: 'Dark Project KD68B Jelly',
    value: 'Механическая · 68 клавиш',
    icon: 'keyboard',
    description: 'Компактная механическая клавиатура с фирменными желейными свитчами.'
  },
  {
    id: 'headphones',
    category: 'Наушники',
    title: 'Logitech G435 Black',
    value: 'Беспроводные',
    icon: 'headphones',
    description: 'Лёгкая беспроводная гарнитура для игр и повседневного использования.'
  }
];
