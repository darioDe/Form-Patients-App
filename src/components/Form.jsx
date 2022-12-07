import {useState, useEffect} from 'react'
import Error from './Error';

const Form = ({ infoPatient, setInfoPatient, info, setInfo }) => {
  
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [alta, setAlta] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);
  
  useEffect(() => {
    if ( Object.keys(info).length > 0 ){
      setNombre(info.nombre);
      setPropietario(info.propietario);
      setEmail(info.email);
      setAlta(info.alta);
      setSintomas(info.sintomas);
    }
  }, [info])
  

  const idGenerator = ()=> {
    const random = Math.random().toString(36).substr(2);
    const dateNow = Date.now().toString(36);

    return random + dateNow;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATE FORM 
    if([ nombre, propietario, email, alta, sintomas].includes('') ) {
      console.log("Hay al menos un campo vacío");
      setError(true);
      return;
    }
    
    setError(false)
    
    // PATIENT OBJECT
    const patientObject = {
      nombre,
      propietario,
      email,
      alta,
      sintomas,
    };

    if (info.id) {
      // EDIT DATA
      patientObject.id = info.id;

      const updatePatient = infoPatient.map( infoState => infoState.id === info.id ? patientObject : infoState );

      setInfoPatient(updatePatient);
      setInfo({})

    } else {
      // NEW DATA
      patientObject.id = idGenerator();
      setInfoPatient([...infoPatient, patientObject]);
    }


    // RESET FORM
    setNombre("");
    setPropietario("");
    setEmail("");
    setAlta("");
    setSintomas("");
  }

  return (
    <div className='md:w-1/2 lg:2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'> Monitoring Patient </h2>

      <p className='text-xl mt-5 text-center mb-10'>
         Add Patient and {""}
         <span className='text-indigo-600 font-bold'>administralos</span>
      </p>

      <form 
        action="" 
        className='bg-white shadow-md rounded-lg py-18 px-5 py-10 mb-10' 
        onSubmit={handleSubmit}
      >
        { error && <Error msg={"All tags are required"}/>}

        <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="mascota"> Nombre </label>
            <input
              id='mascota' 
              type="text"
              placeholder='nombre'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={ nombre }
              onChange={ (e)=> setNombre(e.target.value) }

            />
        </div>
        <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="propietario">Prop </label>
            <input
              id='propietario' 
              type="text"
              placeholder='nombre de prop'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={ propietario }
              onChange={ (e)=> setPropietario(e.target.value) }
            />
        </div>
        <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="email"> Email </label>
            <input
              id='email' 
              type="email"
              placeholder='email de contacto'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={ email }
              onChange={ (e)=> setEmail(e.target.value) }
            />
        </div>
        <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="alta">Alta </label>
            <input
              id='alta' 
              type="date"
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={ alta }
              onChange={ (e)=> setAlta(e.target.value) }
            />
        </div>
        <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="sintomas">Sintomas </label>
            <textarea 
              name="" 
              id="sintomas" 
              placeholder='escribe los sintomas'
              value={ sintomas }
              onChange={ (e)=> setSintomas(e.target.value) } 
            />
        </div>
         
         <input 
          type="submit" 
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value={ info.id ? 'Edit Patient' : 'Add Patient'}
        />
      </form>
   </div>
  )
}

export default Form