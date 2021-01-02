import React from 'react';
import {
  Box,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
    <TableCell>
      <pre>{role.account}</pre>
    </TableCell>
    <TableCell>
      <pre>{role.roleName}</pre>
    </TableCell>
    <TableCell>
      <pre>{role.displayName}</pre>
    </TableCell>
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
        <Box>
          <Link href={getAwsSwitchRoleUrl(role)}>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Box>
        <Box>
          <IconButton onClick={() => handleEdit(role.id)}>
            <EditIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={() => handleDelete(role.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
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
