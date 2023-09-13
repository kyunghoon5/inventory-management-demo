import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface TypeSelectorProps {
  type: number | string;
  setType: (value: number) => void;
  label: string;
  menuItem?: string[]
}

const TypeSelector = ({
  type,
  setType,
  label,
  menuItem,
}: TypeSelectorProps) => {

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setType(Number(event.target.value));
  };
  
  return (
    <div className="flex">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleChange}
          >
            {menuItem?.map((item, index: number) => (
              <MenuItem
              key={index}
              value={index + 1}>
                {item}            
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default TypeSelector;
