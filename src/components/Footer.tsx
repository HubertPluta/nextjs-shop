import Link from "next/link"

export default function Footer() {
    
    return (
        <div className="bg-stone-300 p-3 flex flex-col items-center">
            <h5>Sklep wykonany przez <Link className="underline" href={"https://hubertpluta.pl"}>Huberta Plute</Link> jako przykładowy projekt</h5>
            <ul className="flex gap-3">
                <li className="hover:underline cursor-pointer">Strona głowna</li>
                <li className="hover:underline cursor-pointer">Regulamin</li>
                <li className="hover:underline cursor-pointer">FAQ</li>
                <li className="hover:underline cursor-pointer">Polityka prywatnosci</li>
                <li className="hover:underline cursor-pointer">Pomoc</li>
            </ul>
        </div>
    )
}