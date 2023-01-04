import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@mui/material';

import { Category } from '../../../models/models';
import { useGetAllCategoriesQuery } from '../../../redux/api/category.api';
import { useDeleteDocInfoMutation, useUpdateDocInfoMutation } from '../../../redux/api/doc.api';
import { updateUser } from '../../../redux/slices/userSlice';
import WordCard from '../../WordCard/WordCard';
import {
  cancelButtonStyle,
  collapsedAccordionStyle,
  editAccordionStyle,
  editButtonStyle,
  expandedAccordionStyle,
  formControlStyle,
  saveEditButtonStyle,
} from '../styles';

type Props = {
  categories: Category[]
};

function DocCategories({ categories }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const { data: allCategories } = useGetAllCategoriesQuery();
  const [updateCategory] = useUpdateDocInfoMutation();
  const [deleteCategory] = useDeleteDocInfoMutation();

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const neutral = theme.palette.warning.main;

  const cancleEditHandler = useCallback(() => {
    setInput('');
    setEdit(false);
  }, []);

  const saveEditHandler = useCallback(async (id: string) => {
    if (!id) return;
    setInput('');
    const result = await updateCategory({ categoryId: id }).unwrap();
    dispatch(updateUser(result));
    setEdit(false);
  }, [dispatch, updateCategory]);

  const deleteCategoryHandler = useCallback(async (id: number) => {
    if (!id) return;
    const result = await deleteCategory({ categoryId: id }).unwrap();
    dispatch(updateUser(result));
  }, [deleteCategory, dispatch]);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={!expanded ? collapsedAccordionStyle : expandedAccordionStyle}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="categories-content"
        id="categories"
      >
        <Typography>Специализация</Typography>
      </AccordionSummary>
      {edit
        ? (
          <>
            <AccordionDetails sx={editAccordionStyle}>
              <FormControl sx={formControlStyle}>
                <Select
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  displayEmpty
                  defaultValue=""
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {allCategories?.filter((ac) => categories
                    .filter((c) => c.category.id === ac.id).length === 0)
                    .map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    )) }
                  <MenuItem value="">
                    <em>Выбрать</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
            <AccordionActions>
              <Button
                onClick={() => cancleEditHandler()}
                size="small"
                sx={{ ...cancelButtonStyle, backgroundColor: neutral }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => saveEditHandler(input)}
                size="small"
                sx={{ ...saveEditButtonStyle, backgroundColor: primary }}
              >
                Сохранить
              </Button>
            </AccordionActions>
          </>
        ) : (
          <AccordionDetails>
            {categories.length > 0
              ? (
                <Box sx={{ display: 'flex' }}>
                  {categories.map(({ category }) => (
                    <WordCard
                      key={`${category.id}-${category.name}`}
                      editable
                      text={category.name}
                      clearHandler={() => deleteCategoryHandler(category.id)}
                    />
                  ))}
                </Box>
              )
              : 'Информация отсутствует'}
            <AccordionActions>
              <Button
                onClick={() => setEdit(true)}
                size="small"
                sx={{ ...editButtonStyle, backgroundColor: primary }}
              >
                Редактировать
              </Button>
            </AccordionActions>
          </AccordionDetails>
        )}
    </Accordion>
  );
}

export default memo(DocCategories);
