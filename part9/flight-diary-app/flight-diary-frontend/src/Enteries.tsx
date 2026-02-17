import type { DiaryEntery } from "./types"

function Enteries({ enteries }: { enteries: DiaryEntery[] }) {
        return (
                <div>
                        {
                                enteries.map(e => {
                                        return <Entery key={e.id} entery={e} />;
                                })

                        }
                </div>
        )
}

const Entery = ({ entery }: { entery: DiaryEntery }) => {
        return (
                <div>
                        <h3>{entery.date}</h3>
                        <p>Visibility: {entery.visibility} <br />
                                Weather: {entery.weather}</p>
                </div >
        )
}
export default Enteries
