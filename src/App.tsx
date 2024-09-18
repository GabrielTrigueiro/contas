import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import CustomButton from "./components/Button";

type ItemType = "jaleco" | "bolso" | "bata" | "macacao" | "coletes" | "camisa" | "blusa" | "patch" | "tarja" | "outros";

const itemTypes: ItemType[] = ["jaleco", "bolso", "bata", "macacao", "coletes", "camisa", "blusa", "patch", "tarja", "outros"];

type SubItem = {
  itemName: string;
  embroidery: string;
  price: number;
}

interface Item {
  clientName: string;
  type: ItemType;
  items: SubItem[];
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSubItemForm, setShowSubItemForm] = useState<Record<number, boolean>>({});
  const [newSubItem, setNewSubItem] = useState<SubItem>({ itemName: '', embroidery: '', price: 0 });
  const [tempItem, setTempItem] = useState<Item>({
    clientName: '',
    type: 'jaleco',
    items: []
  });
  const [lote, setLote] = useState<Item[]>([]);

  const handleAddItem = () => {
    setLote([...lote, tempItem]);
    setTempItem({ clientName: '', type: 'jaleco', items: [] }); // Reseta o tempItem
  };

  const handleAddSubItemForm = (index: number) => {
    setShowSubItemForm({ ...showSubItemForm, [index]: true });
  };

  const handleConfirmSubItem = (index: number) => {
    const updatedLote = lote.map((item, i) => {
      if (i === index) {
        return { ...item, items: [...item.items, newSubItem] };
      }
      return item;
    });

    setLote(updatedLote);
    setShowSubItemForm({ ...showSubItemForm, [index]: false });
    setNewSubItem({ itemName: '', embroidery: '', price: 0 }); // Reseta os campos
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className={`p-4 bg-blue-100 rounded-lg`}>
        <div className='flex bg-white p-2 rounded-md border-2 border-black gap-4'>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex w-full justify-between'>
              <TextField
                size='small'
                label="Nome do Cliente"
                value={tempItem.clientName}
                onChange={(e) => setTempItem({ ...tempItem, clientName: e.target.value })}
                variant="standard"
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl size='small' fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">Tipo de Item</InputLabel>
                  <NativeSelect
                    size='small'
                    value={tempItem.type}
                    onChange={(e) => setTempItem({ ...tempItem, type: e.target.value as ItemType })}
                  >
                    {itemTypes.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Box>
              <CustomButton onClick={handleAddItem} label="Adicionar" color="blue" />
            </div>
          </div>
        </div>

        {/* Listagem de Itens e Subitens */}
        <div className="mt-4">
          <div className='flex w-full'>
            <p className="text-lg font-bold w-40">Nome</p>
            <p className="text-lg font-bold w-40">Tipo</p>
            <p className="text-lg font-bold w-40">Total</p>
          </div>
          {lote.map((item, index) => (
            <div key={index} className='flex flex-col gap-2 mt-2'>
              <div className="flex w-full justify-between">
                <p className="text-md w-40">{item.clientName}</p>
                <p className="text-md w-40">{item.type}</p>
                <p className="text-md w-40">R${item.items.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}</p>
              </div>
              <ul className='flex flex-col gap-2 bg-white p-2 rounded-md border-2 border-black'>
                <p className='text-sm font-bold text-center'>Sub-Items</p>
                {item.items.map((subItem, idx) => (
                  <li key={idx} className='flex justify-between'>
                    <p className="text-sm w-40">{subItem.itemName}</p>
                    <p className="text-sm w-40">{subItem.embroidery}</p>
                    <p className="text-sm w-40">R${subItem.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <Button
                size='small'
                sx={{ fontSize: '0.6rem' }}
                onClick={() => handleAddSubItemForm(index)}
              >
                Adicionar sub-item
              </Button>

              {showSubItemForm[index] && (
                <div className='flex flex-col gap-2 mt-4'>
                  <TextField
                    size="small"
                    label="Nome do Item"
                    value={newSubItem.itemName}
                    onChange={(e) => setNewSubItem({ ...newSubItem, itemName: e.target.value })}
                  />
                  <TextField
                    size="small"
                    label="Bordado"
                    value={newSubItem.embroidery}
                    onChange={(e) => setNewSubItem({ ...newSubItem, embroidery: e.target.value })}
                  />
                  <TextField
                    size="small"
                    label="Preço"
                    type="number"
                    value={newSubItem.price}
                    onChange={(e) => setNewSubItem({ ...newSubItem, price: parseFloat(e.target.value) })}
                  />
                  <Button
                    size='small'
                    variant='contained'
                    sx={{ fontSize: '0.6rem' }}
                    onClick={() => handleConfirmSubItem(index)}
                  >
                    Confirmar sub-item
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-start mt-4 gap-4'>
        <p className='text-sm font-bold'>Total: R${lote.reduce((acc, curr) => acc + curr.items.reduce((acc, curr) => acc + curr.price, 0), 0).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
