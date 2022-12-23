import { useState } from 'react'
import instance from '../../services/instance'
import './style.css'

export default function Home() {

  const [user, setUser] = useState('')
  const [error, setError] = useState(false)
  const [profileInfos, setProfileInfos] = useState([])

  async function handleSubmit(e) {

    e.preventDefault()
    setError(false)
    setProfileInfos([])

    try {

      const { data } = await instance.get(`/${user}`)

      setProfileInfos(data)
      console.log(data)
    } catch (error) {

      console.log(error)
      return setError(true)

    }
  }

  return (
    <main className='finder-page center-align'>

      <section className='main-content'>

        <form className='form-finder center-align' onSubmit={handleSubmit}>
          <h1 className='title'>Buscador de perfis gitHub</h1>
          <div className='search-content'>
            <input
              className='input-finder'
              placeholder='Buscar perfil...'
              type='text'
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onKeyUp={(e) => !e.target.value && setProfileInfos([])}
            />
            <button className='button-finder' type='submit'>Buscar</button>
          </div>
        </form>

        <section className='profile-content'>
          {profileInfos.name ?

            <>
              <h1 className='title'>Perfil</h1>

              <div className='profile-infos center-align'>

                <img className='profile-image' src={profileInfos.avatar_url} alt='' />
                <h1 className='title' >{profileInfos.name}</h1>

                <p className='profile-bio'>
                  {profileInfos.bio}
                </p>

                <div className='followers-types-content'>

                  <div className='center-align'>
                    <h2 className='subtitle'>Seguidores:</h2>
                    <h2>{profileInfos.followers}</h2>
                  </div>

                  <div className='center-align'>
                    <h2 className='subtitle'>Seguindo:</h2>
                    <h2>{profileInfos.following}</h2>
                  </div>
                </div>
                <a className='button-finder' href={`https://github.com/${profileInfos.login}`} target='_blank'>Ver no Github</a>
              </div>

            </>

            :

            error ? <h1 className='title' style={{ margin: '0' }}>Perfil não encontrado...</h1> :

              <h1 className='title' style={{ margin: '0' }}>Busque um perfil...</h1>

          }
        </section>
      </section>

    </main>
  )
}

