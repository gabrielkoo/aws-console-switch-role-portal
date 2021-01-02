import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import Footer from './components/Footer';
import RoleList from './components/RoleList';
import SwitchRoleModal from './components/SwitchRoleModal';
import TopBar from './components/TopBar';
import { Role } from './types';

const App = () => {
  const [roleList, setRoleList] = useLocalStorage<Role[]>('roleList', []);
  const [formMode, setFormMode] = useState<'create' | 'edit' | ''>('');
  const [recordId, setRecordId] = useState<string>('');
  const [initialValues, setInitialValues] = useState<Role | undefined>(
    undefined,
  );
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    setRecordId('');
    setFormMode('');
  }, [setOpen, setRecordId, setFormMode]);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleCreate = () => {
    setRecordId('');
    setFormMode('create');
    handleOpen();
  };

  const handleEdit = React.useCallback(
    (recordId: string) => {
      setRecordId(recordId);
      setFormMode('edit');
    },
    [setRecordId, setFormMode],
  );

  const handleDelete = React.useCallback(
    (recordId: string) => {
      const idx = roleList?.findIndex(record => record.id === recordId) ?? -1;
      if (idx > -1) {
        roleList?.splice(idx, 1);
        setRoleList(roleList);
      }
      handleClose();
    },
    [roleList, setRoleList, handleClose],
  );

  React.useEffect(() => {
    if (formMode === '') {
      setInitialValues(undefined);
      handleClose();
      return;
    }

    if (formMode === 'edit') {
      const match = roleList?.find(({ id }) => id === recordId);
      if (match) {
        setInitialValues(match);
        handleOpen();
        return;
      }
    }
    setInitialValues({
      id: recordId || uuidv4(),
      account: '',
      roleName: '',
      displayName: '',
      color: '000000',
    });
    handleOpen();
  }, [formMode, recordId, roleList, setInitialValues, handleOpen, handleClose]);

  const filteredRoleList = React.useMemo(() => {
    return (
      roleList?.filter(role =>
        Object.values(role).some(value =>
          value?.toLowerCase().includes(search),
        ),
      ) ?? []
    );
  }, [roleList, search]);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#ec7211',
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <main>
        <Container style={{ marginTop: 75, marginBottom: 25 }}>
          <Grid container spacing={2} direction="row" justify="flex-end">
            <Grid item xs={11} sm={11}>
              <TextField
                label="Search"
                value={search}
                onChange={event => setSearch(event.target.value.toLowerCase())}
              />
            </Grid>
            <Grid item xs={1} sm={1}>
              <IconButton onClick={handleCreate}>
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={12}>
              {roleList && (
                <RoleList
                  roleList={filteredRoleList}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </Grid>
          </Grid>
        </Container>
        {formMode && initialValues && (
          <SwitchRoleModal
            open={open}
            formMode={formMode}
            initialValues={initialValues}
            handleClose={handleClose}
            roleList={roleList}
            setRoleList={setRoleList}
          />
        )}
      </main>
      <Footer />
    </MuiThemeProvider>
  );
};

export default App;
