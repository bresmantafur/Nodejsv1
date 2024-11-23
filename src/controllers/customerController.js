const controller = {};

// Mostrar la lista de clientes
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers || [],
            });
        });
    });
};

// Guardar un nuevo cliente
controller.save = (req, res) => {
    const { name, direccion, telefono } = req.body;

    // Validación de campos vacíos
    if (!name || !direccion || !telefono) {
        req.flash('errorMessage', 'Todos los campos son obligatorios.');
        return res.redirect('/'); // Redirige al formulario con el mensaje de error
    }

    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            req.flash('errorMessage', 'Hubo un problema al guardar el cliente.');
            return res.redirect('/');
        }

        // Guardar cliente en la base de datos
        conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
            if (err) {
                req.flash('errorMessage', 'Hubo un error al guardar el cliente.');
                return res.redirect('/');
            }

            req.flash('successMessage', 'Cliente guardado con éxito.');
            res.redirect('/'); // Redirige con el mensaje de éxito
        });
    });
};

// Editar un cliente
controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
};

// Actualizar un cliente
controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer SET ? WHERE id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

// Eliminar un cliente
controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;
