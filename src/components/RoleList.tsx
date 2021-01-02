import React from 'react';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import { Role } from '../types';
import { getAwsSwitchRoleUrl } from '../utils';

type RoleRowProps = {
  role: Role;
  handleEdit: any;
  handleDelete: any;
};

type RoleListProps = {
  roleList: Role[];
  handleEdit: any;
  handleDelete: any;
};

const HEADERS = ['Account', 'Role Name', 'Display Name', 'Color', 'Actions'];

const RoleRow = ({ role, handleEdit, handleDelete }: RoleRowProps) => (
  <TableRow key={role.id}>
    {['account', 'roleName', 'displayName'].map(key => (
      <TableCell key={key}>
        <pre>{role[key]}</pre>
      </TableCell>
    ))}
    <TableCell>
      <Box alignItems="center" display="flex">
        <Box>
          <span style={{ color: `#${role.color}` }}>█&nbsp;</span>
        </Box>
        <Box>
          <pre>{role.color}</pre>
        </Box>
      </Box>
    </TableCell>
    <TableCell>
      <Box alignItems="center" display="flex">
        <Tooltip title="Grant Role">
          <IconButton
            onClick={() =>
              window.open(
                getAwsSwitchRoleUrl(role),
                '_blank',
                'noopener noreferrer',
              )
            }
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Role">
          <IconButton onClick={() => handleEdit(role.id)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Role">
          <IconButton onClick={() => handleDelete(role.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </TableCell>
  </TableRow>
);

const RoleList = ({ roleList, handleEdit, handleDelete }: RoleListProps) => (
  <Table>
    <TableHead>
      <TableRow>
        {HEADERS.map((header: string) => (
          <TableCell key={header}>{header}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {roleList.map((role: Role, i: number) => (
        <RoleRow
          key={i}
          role={role}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </TableBody>
  </Table>
);

export default RoleList;
