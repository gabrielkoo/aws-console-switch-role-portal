import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Container, Grid, IconButton } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import Footer from './components/Footer';
import RoleList from './components/RoleList';
import SwitchRoleModal from './components/SwitchRoleModal';
import TopBar from './components/TopBar';
import { theme } from './styles';
import { Role } from './types';

const App = () => {
  const [roleList, setRoleList] = useLocalStorage<Role[]>('roleList', []);
  const [formMode, setFormMode] = useState('');
  const [recordId, setRecordId] = useState('');
  const [initialValues, setInitialValues] = useState<Role | undefined>(
    undefined,
  );
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

  return (
    <MuiThemeProvider theme={theme}>
      <TopBar />
      <main>
        <div style={{ marginTop: 75 }} />
        <Container>
          <Grid container spacing={2} direction="row-reverse">
            <Grid item xs={12} sm={12}>
              <IconButton onClick={handleCreate} color="primary">
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={12}>
              {roleList && (
                <RoleList
                  roleList={roleList}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Footer />
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
    </MuiThemeProvider>
  );
};

export default App;
