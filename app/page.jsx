import '@styles/mainPage.css'

export default function Home() {
  const imgs = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
  let i = 0
  return (
    <div>
      <div class="container c2">
        <div>
          <h1>Welcome to our Events App</h1>
          <p>Thanks to this application, users can create educational courses and activities, as well as participate in exciting cultural and sporting events.</p>
        </div>

        <div>
          <div>
            {
              imgs.map((img) => {
                i = (i+1) % 2;
                return (
                  <div dir={ i == 0 ? 'ltr' : 'rtl' }> <img src={`/main/${img}.png`} alt="" /> </div>
                )})
              }
          </div>
        </div>
    </div>
    </div>
  );
}
