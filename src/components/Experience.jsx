import { Environment, OrbitControls } from '@react-three/drei';

import { useGameState } from '../hooks/useGameState';
import GameArena from './GameArena';
import { myPlayer } from 'playroomkit';
import { CharacterController } from './CharacterController';

export const Experience = () => {
	const { players, stage } = useGameState();
	const me = myPlayer();

	return (
		<>
			<OrbitControls />
			<Environment files={'hdrs/medieval_cafe_1k.hdr'} />

			<>
				{stage !== 'lobby' && <GameArena />}
				{players.map(({ state, controls }) => (
					<CharacterController
						key={state.id}
						state={state}
						controls={controls}
						player={me.id === state.id}
						position-y={2}
					/>
				))}
			</>

			<GameArena />
		</>
	);
};
