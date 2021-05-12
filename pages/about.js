import Link from 'next/link';
import Layout from '@/components/Layout';

export default function AboutPage() {
	return (
		<Layout>
			<h1>About</h1>
			<p>
				Trees are the most important part of the ecosystem which helps in balancing the climate and the
				environment. A forest comprises of trees and plants helps to reverse the global warming which adversely
				maintain the health of the earth. Global warming is the biggest problem facing by earth and the
				humankind nowadays which adversely effects our earth and results of the same are observed in these days
				are:
			</p>
			<ul className="list-style-none">
				<li>Increase in level of the sea.</li>
				<li>Temperature increase.</li>
				<li>Fog</li>
				<li>Climate Change</li>
				<li>Melting of glaciers</li>
			</ul>

			<h2>This Event will...</h2>
			<p>
				An average size tree creates sufficient oxygen in one year to provide oxygen for a family of four.
				Planting trees can cut air-conditioning/ electricity costs up to 50 percent. Planting trees for the
				environment is good as they are renewable, biodegradable and recyclable. If we plant 20 million trees,
				the earth will get with 260 million more tons of oxygen. Once acre of trees can remove up to 2.6 tons of
				Carbon Dioxide each year. During photosynthesis, trees and other plants absorb carbon dioxide and give
				off oxygen. Trees keep in cheek the air and water pollution. Why planting trees is important is evident
				as they are the natural habitat of the animals and birds, as well as many endangered species. Planting
				trees means more wood and paper products which can be easily recycled. A newly planted whole forest can
				change tones of atmospheric carbon into wood and other fibrous tissue, thus reducing global warming.
			</p>
			<p>version 1.0.0</p>
			<Link href='/'>Home</Link>
		</Layout>
	);
}
