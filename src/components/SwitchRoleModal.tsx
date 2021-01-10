import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import startCase from 'lodash/startCase';
import React from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { FontDownload as FontDownloadIcon } from '@material-ui/icons';
import { Role } from '../types';

type SwitchRoleModalProps = {
  formMode: string;
  initialValues: Role;
  open: boolean;
  handleClose: any;
  roleList: Role[] | undefined;
  setRoleList: (roleList: Role[]) => void;
};

const MAX_WIDTH = 300;

const textFormFieldsList = [
  {
    name: 'account',
    label: 'Account',
    required: true,
    pattern: '([a-z0-9](([a-z0-9]|-(?!-))*[a-z0-9])?|d{12})',
  },
  {
    name: 'roleName',
    label: 'Role Name',
    required: true,
    pattern: `[a-zA-Z0-9_+=,.@-]{1,64}`,
  },
  { name: 'displayName', label: 'Display Name (Optional)' },
  /* TODO: change to `@material-ui/labs/AutoComplete` component */
  { name: 'redirectURI', label: 'Redirect URI (Optional)' },
];

/* Colors copied from AWS */
const colorChoices = [
  'F2B0A9',
  'FBBF93',
  'FAD791',
  'B7CA9D',
  '99BCE3',
  // '000000', /* Not offered because of AWS Input Bug"
];

const SwitchRoleModal = ({
  formMode,
  initialValues,
  open,
  handleClose,
  roleList,
  setRoleList,
}: SwitchRoleModalProps) => {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: values => {
      if (!roleList) {
        setRoleList([values]);
        handleClose();
        return;
      }

      const idx = roleList.findIndex(({ id }) => id === values.id);
      if (idx > -1) roleList[idx] = values;
      else roleList.push(values);

      setRoleList(roleList);
      handleClose();
    },
    enableReinitialize: true,
  });

  if (!roleList) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">{startCase(formMode)} Role Record</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            spacing={3}
            justify="center"
            alignItems="center"
          >
            <FormControl>
              <TextField
                id="id"
                name="id"
                onChange={handleChange}
                type="hidden"
                disabled
                value={values.id}
              />
            </FormControl>
            {textFormFieldsList.map(
              ({ name, label, required = false, pattern = '', ...restProps }) => (
                <Grid item key={name}>
                  <FormControl style={{ width: MAX_WIDTH }}>
                    <TextField
                      id={name}
                      name={name}
                      label={label}
                      onChange={handleChange}
                      value={values[name]}
                      variant="outlined"
                      inputProps={pickBy(
                        {
                          required,
                          pattern,
                          title: pattern
                            ? `It should match the RegExp ${pattern}`
                            : '',
                        },
                        identity,
                      )}
                      {...restProps}
                    />
                  </FormControl>
                </Grid>
              ),
            )}
            <Grid item>
              <FormControl component="fieldset" style={{ width: MAX_WIDTH }}>
                <FormLabel htmlFor="name">Color</FormLabel>
                <RadioGroup row>
                  {colorChoices.map((color: string) => (
                    <FormControlLabel
                      key={color}
                      checked={values.color === color}
                      control={
                        <Radio
                          checkedIcon={
                            <FontDownloadIcon
                              style={{ color, border: 'black 1px solid' }}
                            />
                          }
                          icon={
                            <FontDownloadIcon
                              style={{ color, border: 'transparent 1px solid' }}
                            />
                          }
                          required={true}
                        />
                      }
                      onChange={handleChange}
                      value={color}
                      label=""
                      name="color"
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            children={formMode === 'edit' ? 'Save' : 'Create'}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SwitchRoleModal;
