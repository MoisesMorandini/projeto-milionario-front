import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { MdDashboard, MdArrowBack, MdViewCompact } from 'react-icons/md';

export const mainListItems = (
  <div>

    <Link to="/admin/">
      <ListItem button>
        <ListItemIcon>
          <MdDashboard />
        </ListItemIcon>
        <ListItemText primary="Início" />
      </ListItem>
    </Link>
    <Link to="/admin/orders">
      <ListItem button>
        <ListItemIcon>
          <MdViewCompact />
        </ListItemIcon>
        <ListItemText primary="Relatório de Pedidos" />
      </ListItem>
    </Link>
    <Link to="/admin/sales">
      <ListItem button>
        <ListItemIcon>
          <MdViewCompact />
        </ListItemIcon>
        <ListItemText primary="Relatório de Vendas" />
      </ListItem>
    </Link>
    <Link to="/admin/categories">
      <ListItem button>
        <ListItemIcon>
          <MdViewCompact />
        </ListItemIcon>
        <ListItemText primary="Categoria" />
      </ListItem>
    </Link>
    <Link to="/admin/products">
      <ListItem button>
        <ListItemIcon>
          <MdViewCompact />
        </ListItemIcon>
        <ListItemText primary="Produto" />
      </ListItem>
    </Link>
    <Link to="/admin/department">
      <ListItem button>
        <ListItemIcon>
          <MdViewCompact />
        </ListItemIcon>
        <ListItemText primary="Departamento" />
      </ListItem>
    </Link>
    <Link to="/admin/banner">
      <ListItem button>
        <ListItemIcon>
          <MdViewCompact />
        </ListItemIcon>
        <ListItemText primary="Banner" />
      </ListItem>
    </Link>
    <Link to="/admin/logo">
      <ListItem button>
        <ListItemIcon>
          <MdViewCompact />
        </ListItemIcon>
        <ListItemText primary="Logo" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <MdArrowBack />
        </ListItemIcon>
        <ListItemText primary="Ir para o site" />
      </ListItem>
    </Link>
  </div>
);
