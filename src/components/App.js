import React, {useState} from 'react'
const shortid = require('shortid');

const App = () => {

    const [tarea, setTarea] = useState('');
    const [tareas, setTareas] = useState([]);
    const [modoEdicion, setModoEdicion] =useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null)



    const agregarTarea = (e) => {
        e.preventDefault();
        if(!tarea.trim()){
            console.error("Campo Vacio");
            setError('El campo no puede estar Vacío');
            return;
        }
        setTareas([
            ...tareas,
            {tarea, id: shortid.generate()}
        ]);
        setTarea('');
        setError(null)
    };

    const eliminarTarea = id => {
        const arrayFiltrado = tareas.filter(item => item.id !== id)
        setTareas(arrayFiltrado);
    }

    const editar = item => {
        setModoEdicion(true)
        setTarea(item.tarea)
        setId(item.id)
      }

    const editarTarea = e => {
        e.preventDefault()
        if(!tarea.trim()){
            console.log('Campo Vacio');
            setError('El campo no puede estar vacío')
            return
        }

        const arrayEditado = tareas.map(item => item.id === id ? {id, tarea} : item);
        setTareas(arrayEditado);
        setModoEdicion(false);
        setTarea('');
        setId('');
        setError(null)
    }


    
    
    return (
        <div className="container mt-5">
            <h1 className="text-center">Simple Crud</h1>
            <hr/>
            <div className="row">


                <div className="col-sm-8">
                    <h4 className="text-center">Lista de Tareas</h4>
                    <ul className="list-group">
                       {
                           tareas.length === 0 ? 
                           (<li className="list-group-item">Sin Tareas</li>)
                           :
                           (
                            tareas.map((item)=>(
                            <li className="list-group-item" key={item.id}>
                            <span className="lead">{item.tarea}</span>
                            <button className="btn btn-danger btn-sm float-right mx-2"
                            onClick={() => eliminarTarea(item.id)}
                            >Eliminar</button>
                            <button className="btn btn-warning btn-sm float-right mx-2"
                            onClick={()=> editar(item)}
                            >Editar</button>
                        </li>
                            ))
                           )
                       }
                    </ul>
                </div>


                <div className="col-sm-4">
                    {
                        (modoEdicion) ? 'Editar Tarea' : 'Agregar Tarea'
                    }

                    <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
                        {
                            error && (<span className="text-danger">{error}</span>)
                        }
                        <input type="text" 
                        className="form-control mb-2" 
                        placeholder="Ingresa Tarea"
                        onChange={e => setTarea(e.target.value)}
                        value={tarea}
                        />
                        {
                            modoEdicion ?
                            (<button className="btn btn-warning btn-block" type="submit">Editar</button>)
                            :
                            <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                        }
                    </form>

                </div>


            </div>

        </div>
    )
}

export default App
